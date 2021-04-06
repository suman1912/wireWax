require('dotenv').config();
var sha1 = require('sha1');

const User = require('../models/User');

module.exports = sanitizeCSRF = (req, res, next) => {
    let username = req.session.secret;
    /*if(req.session.secret){
        username = req.session.secret;
    }else if(req.body.username){
        username = req.body.username;
    }else if(req.body.email){
        username = req.body.email;
    }*/
    //console.log(username);

    let salt = process.env.SALT,
    secret = sha1(salt + username);
    
    User.find({
        secret: secret
    })
    .then(([row]) => {
        if(!row){
            res.status(401).json({ status: 0, msg: 'Unauthorized to process this request!' });
        }else{
            next();
        }
    })
    .catch(err => {
        res.status(500).json({ status: 0, msg: 'Server authentication failed! Please try again.', error: err });
    });
};
