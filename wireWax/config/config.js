const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});
console.log(process.env.HOSTNAME);
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOSTNAME || '127.0.0.1',
  PORT: process.env.PORT || 3000
}