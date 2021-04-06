require('dotenv').config();
var sha1 = require('sha1');
const { base64encode, base64decode } = require('nodejs-base64');

const rootDir = require('../helpers/path');
const error = require(`${rootDir}/helpers/error`);

const User = require('../models/User');
const Token = require('../models/Token');

const fileName = __filename.slice(__dirname.length + 1, -3);

const _msg = 'Unauthorized to process this URL!';
module.exports = {
    checkTokens: (req, res, next) => {

        if (req.get('x-information') && req.get('accept') && req.get('authorization')) {
            console.log(req.get('accept'));
            let username = base64decode(req.headers['x-information']),
                salt = process.env.SALT,
                secret = sha1(salt + username),
                contype = req.headers['accept'];

            let authorization = req.headers['authorization'], // POP Token from token collection
                arrAuth = authorization.split(/(\s+)/),
                agent = arrAuth[0],
                token = arrAuth[2];

            if (!contype || !username || !token || agent !== "POP") {
                res.status(401).json({ status: 0, msg: _msg });
                res.end();
            } else {
                User.find({
                    secret: secret,
                    status: 1
                }).then(user => {
                    if (!user) {
                        res.status(401).json({ status: 0, msg: _msg });
                        res.end();
                    } else {
                        Token.find({ 'token': token }).select('-_id -userId').then(result => {
                            if (result.length > 0) {
                                next();
                            } else {
                                res.status(401).json({ status: 0, msg: _msg });
                                res.end();
                            }
                        }).catch(err => {
                            error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
                            res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
                            res.end();
                        });
                    }
                }).catch(err => {
                    error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
                    res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
                    res.end();
                });
            }
        } else {
            res.status(203).json({ status: 0, msg: "Request headers not present!" });
            res.end();
        }
    },
    checkHeaders: (req, res, next) => {
        /*let contype = req.headers['content-type'];
        if (!contype || contype !== 'application/json') {
            res.status(401).json({ status: 0, msg: _msg });
            res.end();
        } else {
            next();
        }*/
        next();
    }
}