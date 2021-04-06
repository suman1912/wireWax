require('dotenv').config();
const sha1 = require('sha1');
const md5 = require('md5');
const { validationResult } = require('express-validator');
const { base64encode, base64decode } = require('nodejs-base64');

const rootDir = require('../../../helpers/path');
const error = require(`${rootDir}/helpers/error`);
const sendSMS = require(`${rootDir}/helpers/sendSMS`);

const fileName = __filename.slice(__dirname.length + 1, -3);

const User = require(`${rootDir}/models/User`);
const Block = require(`${rootDir}/models/Block`);
const Token = require(`${rootDir}/models/Token`);

const postApi = require(`./postApiController`);

/* Checking signup api by this function */
exports.signup = async (req, res, next) => {
    let { name, gender, age, phone, username, password, state, district, panchayat, village, participantNumber, blockInfo, blockPassword, deviceId, sentOtp, verifyOtp } = req.body,
        salt = process.env.SALT,
        hashPassword = sha1(md5(password) + salt),
        randomStr = Math.random().toString(36).substring(2),
        secret = sha1(salt + username),
        rawToken = sha1(salt + randomStr),
        otp = Math.floor(1000 + Math.random() * 9000),
        custodianUser = false,
        otpVerifiedStatus = false;

    if (name && gender && age && phone && username && password && state && district && panchayat && village && participantNumber && deviceId) {
        if (!blockPassword) {
            if (!verifyOtp) {
                let sms = `Your POP registration OTP is: ${otp}.Note: Please DO NOT SHARE this OTP with anyone.`;

                const sent = await sendSMS.sendMsg(phone, sms);
                if (sent.data.status == 'success') {
                    return res.status(200).json({ status: 1, data: base64encode(otp), msg: 'OTP has been sent successfully', });
                } else {
                    res.status(203).json({ status: 2, msg: 'Failed to send the OTP! Please try again.' });
                    res.end();
                }
            } else {
                if (verifyOtp == base64decode(sentOtp)) {
                    otpVerifiedStatus = true;
                } else {
                    res.status(203).json({ status: 2, msg: 'Invalid OTP!' });
                    res.end();
                }
            }
        }

        try {
            let block = null;
            if (blockPassword) {
                block = await Block.findOne({ _id: blockInfo, password: blockPassword.toUpperCase(), status: 1 }).select('_id block password');
            }
            if (block || otpVerifiedStatus) {
                let row = await User.find({ 'username': username }),
                    userRow = await User.find({ 'deviceId': deviceId });

                if (userRow.length === 0) {
                    custodianUser = true;
                }
                if (row.length === 0) {
                    const user = new User({
                        name: name,
                        gender: gender,
                        age: age,
                        phone: phone,
                        username: username,
                        password: hashPassword,
                        state: state,
                        district: district,
                        panchayat: panchayat,
                        village: village,
                        participantNumber: participantNumber,
                        deviceId: deviceId,
                        block: block,
                        type: 100, // Benificiary type define.
                        custodianUser: custodianUser,
                        status: 1,
                        token: sha1(salt + password),
                        secret: secret
                    });

                    let result = await user.save();

                    const token = new Token({
                        userId: result._id,
                        token: rawToken
                    });
                    const tokenResponse = await token.save();
                    if (tokenResponse) {
                        let msg = 'You have registered successfully.';
                        if (otpVerifiedStatus) {
                            msg = 'OTP has been verified successfully.';
                        }
                        res.status(201).json({ status: 1, msg: msg });
                        res.end();
                    }
                } else {
                    res.status(203).json({ status: 2, msg: 'Username already exists! Please try another username.' });
                    res.end();
                }
            } else {
                if (!block) {
                    res.status(203).json({ status: 2, msg: 'Invalid block password!' });
                    res.end();
                } else {
                    res.status(203).json({ status: 2, msg: 'OTP verification failed!' });
                    res.end();
                }
            }
        } catch (err) {
            console.log(err);
            error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
            res.status(203).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
            res.end();
        }
    } else {
        res.status(203).json({ status: 0, msg: 'Validation Failed!' });
        res.end();
    }
}

/* Checking signin api by this function */
exports.signin = (req, res, next) => {

    let username = req.body.username,
        salt = process.env.SALT,
        password = sha1(md5(req.body.password) + salt),
        randomStr = Math.random().toString(36).substring(2),
        secret = sha1(salt + username),
        phone = req.body.phone,
        deviceID = req.body.deviceId;

    if (username && password && phone && deviceID) {
        User.find({
            username: username,
            password: password,
            secret: secret,
            status: 1,
            type: 100,
            deviceId: deviceID
        }).select('_id type name username custodianUser').then(row => {
            if (typeof row !== 'undefined' && row.length > 0) {
                let rawToken = sha1(salt + randomStr),
                    loggedInData = Object.assign(row[0], { token: rawToken }),
                    utc = new Date();

                User.updateOne({ _id: row[0]._id }, { $set: { 'loggedInStatus': 1 } }).then();

                Token.updateOne({ userId: row[0]._id }, {
                    $set: {
                        'token': rawToken,
                        'updated_at': utc
                    }
                }).then(() => {
                    res.status(200).json({ status: 1, msg: 'You have Successfully Logged In.', data: loggedInData });
                    res.end();
                }).catch(err => {
                    error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
                    res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
                    res.end();
                });

            } else {
                res.status(203).json({ status: 2, msg: 'Invalid username or password or phone number!' });
                res.end();
            }
        }).catch(err => {
            error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
            res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
            res.end();
        });
    } else {
        res.status(422).json({ status: 0, msg: 'Validation Failed!' });
        res.end();
    }
}

/* Updating the new password by this function */
exports.changePassword = (req, res, next) => {
    let info = req.session.info,
        salt = process.env.SALT,
        oldPassword = sha1(md5(req.body.oldPassword) + salt),
        newPass = sha1(md5(req.body.password) + salt),
        date = new Date();

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
        res.status(203).json({ status: 0, errors: errors.array() });
        return;
    } else {
        User.findOne({ _id: info, password: oldPassword, type: 100 }).then(row => {
            if (row) {
                row.password = newPass;
                row.token = sha1(salt + newPass);
                row.updated_at = date;
                row.save().then(() => {
                    req.session = null;
                    res.status(200).json({ status: 1, msg: 'Password changed successfully.', returnURL: '/admin/login' });
                }).catch(err => {
                    console.log(err);
                    error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
                    res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
                });
            } else {
                res.status(203).json({ status: 2, msg: 'Invalid old password!' });
            }
        }).catch(err => {
            console.log(err);
            error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
            res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        });
    }
}

/* Get custodian data by this function */
exports.getCustodian = (req, res, next) => {
    const info = req.params.deviceID;
    User.findOne({ custodianUser: true, deviceId: info }).select('phone -_id').then(result => {
        if (result) {
            res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: result });
            res.end();
        } else {
            res.status(203).json({ status: 2, msg: 'Data does not found!.', data: result });
            res.end();
        }
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}
