const { base64encode, base64decode } = require('nodejs-base64');

const rootDir = require('../../../helpers/path');
const error = require(`${rootDir}/helpers/error`);
const sendSMS = require(`${rootDir}/helpers/sendSMS`);

const User = require(`${rootDir}/models/User`);
const Sync = require(`${rootDir}/models/SyncedUserData`);

const fileName = __filename.slice(__dirname.length + 1, -3);

/* Verify otp after registration by this function */
exports.verifyOTP = async (req, res, next) => {
    let { otp } = req.body;
    if (otp) {
        try {
            const row = await User.findOne({ otp: otp }).select('_id');
            if (row) {
                row.otp = null;
                row.save().then(() => {
                    res.status(200).json({ status: 1, msg: 'OTP has been verified successfully.' });
                    res.end();
                });
            } else {
                res.status(203).json({ status: 2, msg: 'Invalid OTP!' });
                res.end();
            }
        } catch (err) {
            error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
            res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
            res.end();
        }
    } else {
        res.status(203).json({ status: 2, msg: 'OTP field is required!' });
        res.end();
    }
}

/* Send resend otp by this function */
exports.resendOTP = async (req, res, next) => {
    try {
        let { otp, phone } = req.body;
        if (otp && phone) {
            console.log(otp)
            let sms = `Your POP registration OTP is: ${base64decode(otp)}.Note: Please DO NOT SHARE this OTP with anyone.`;

            const sent = await sendSMS.sendMsg(phone, sms);
            console.log(sent.data.errors)
            if (sent.data.status == 'success') {
                res.status(200).json({ status: 1, msg: 'OTP has been sent successfully' });
                res.end();
            } else {
                res.status(203).json({ status: 2, msg: 'Failed to send the OTP! Please try again.' });
                res.end();
            }
        } else {
            res.status(203).json({ status: 2, msg: 'Validation failed!' });
            res.end();
        }
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* User sync data store to collection by this function */
exports.storeSyncData = async (req, res, next) => {
    try {
        let { data } = req.body,
            dataReplaced = null,
            dataSaved = null,
            newObject = {};

        if (data) {
            delete Object.assign(newObject, data, { userId: data._id })._id;

            const findSyncedUserData = await Sync.findOne({ userId: newObject.userId });
            if (findSyncedUserData) {
                dataReplaced = await Sync.updateOne({ userId: newObject.userId }, newObject, { upsert: true });
            } else {
                const syncUserData = new Sync(newObject);
                dataSaved = await syncUserData.save();
            }

            if (dataSaved || dataReplaced) {
                res.status(200).json({ status: 1, msg: 'User data synced successfully.' });
                res.end();
            } else {
                res.status(203).json({ status: 2, msg: 'User data sync failed!' });
                res.end();
            }
        } else {
            res.status(203).json({ status: 2, msg: 'Validation failed!' });
            res.end();
        }
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}