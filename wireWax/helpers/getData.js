const axios = require("axios");
const urlencode = require('urlencode');
require('dotenv').config();

const rootDir = require('./path');
const error = require(`${rootDir}/helpers/error`);

const fileName = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    /* Retriving the data after request by calling the axios */
    retriveData: (url) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios(url, {
                    method: "GET",
                }).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
                    reject(err);
                });
            }, 3000);
        });
    }
}