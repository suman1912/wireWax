require('dotenv').config();
var sha1 = require('sha1');
const { base64encode, base64decode } = require('nodejs-base64');

const rootDir = require('../helpers/path');
const error = require(`${rootDir}/helpers/error`);
const user = require(`${rootDir}/helpers/user`);

const fileName = __filename.slice(__dirname.length + 1, -3);

const _msg = 'Unauthorized to process this URL!';
module.exports = {
    /* Authenticate user data to check headers present or not present */
    checkTokens: (req, res, next) => {
        try {
            if (req.get('x-information') && req.get('content-type') && req.get('authorization')) {
                let username = base64decode(req.headers['x-information']),
                    salt = process.env.SALT,
                    secret = sha1(salt + username),
                    contype = req.headers['content-type'];

                let authorization = req.headers['authorization'], // POP Token from token collection
                    arrAuth = authorization.split(/(\s+)/),
                    auth = arrAuth[0],
                    token = arrAuth[2];

                if (contype !== 'application/json' || !username || !token || auth !== 'Basic') {
                    res.status(401).json({ status: 0, msg: _msg });
                    res.end();
                } else {
                    if (user.token == token && user.username == base64decode(username) && user.secret == secret) {
                        next();
                    } else {
                        res.status(401).json({ status: 0, msg: 'Invalid Credentials!' });
                        res.end();
                    }
                }
            } else {
                res.status(203).json({ status: 0, msg: "Request headers not present!" });
                res.end();
            }
        } catch (err) {
            error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
            res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
            res.end();
        }
    }
}