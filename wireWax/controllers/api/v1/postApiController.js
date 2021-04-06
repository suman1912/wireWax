const rootDir = require('../../../helpers/path');
const error = require(`${rootDir}/helpers/error`);

const fileName = __filename.slice(__dirname.length + 1, -3);

const fileValidationUploader = require(`${rootDir}/helpers/filesValidationUploader`);

/* Upload file to call this controller function  */
exports.uploadFile = async (req, res, next) => {
    try {
        let rawPath = `${rootDir}/public/uploads/`;
        const checkValidFile = await fileValidationUploader.fileValidatorUploader(req.files, rawPath); // calling global helper function
        if (checkValidFile.invalidMsg) {
            res.status(203).json({ status: 1, msg: 'File uploaded successfully.' });
            res.end();
        } else {
            res.status(422).json({ status: 2, msg: checkValidFile.invalidMsg });
            res.end();
        }
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}