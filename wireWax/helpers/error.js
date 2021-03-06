const fs = require('fs');
const dateTime = require('node-datetime');

const rootDir = require('./path');

module.exports = { 
  logError : function(fileName, errorData){
    let dt = dateTime.create(),
    currentDate = dt.format('d-m-Y H:M:S');

    fs.appendFile(rootDir + '/logs/' + fileName + '.txt', '\r\n [[' + currentDate + '] => ' + errorData + ']\r\n', function (err) {
        if (err) throw err;
        return true;
    });    
  }
}
