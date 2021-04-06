const fs = require('fs');
const _path = require('path');
const rootDir = require('../helpers/path');
const error = require(`${rootDir}/helpers/error`);

const fileName = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    /* Globally uploding and validating the video file by this helper function */
    fileValidatorUploader: (reqData, path) => {
        try {
            let returnObj = {};
            if (reqData) {
                let video = reqData.video,
                    videoFileName = null,
                    videoTypeList = ['.3gpp2', '.mp4', '.mpeg', '.x-ms-wmv', '.mkv', '.MKV', 'MP4'], /* Write video file type here */
                    videoSize = 1024000, /* Write video file size here */
                    validVideoFile = true,
                    rawPath = path,
                    invalidMsg = "";

                /* Video validation start here */
                returnObj['videoName'] = videoFileName;
                if (video) {
                    let extVideoName = _path.extname(video.name);
                    if (video.size > videoSize) {
                        invalidMsg += 'Video file size should be less than 1 MB.</br>';
                        validVideoFile = false;
                    }

                    if (!videoTypeList.includes(extVideoName)) {
                        invalidMsg += "Video file type should be .3gpp2, .mp4, .mpeg, .x-ms-wmv, .mkv, .MKV, .MP4.\r\n";
                        validVideoFile = false;
                    }

                    if (validVideoFile) {
                        videoFileName = `video` + video.md5 + video.name;
                        uploadPath = rawPath + videoFileName;

                        returnObj['videoName'] = videoFileName;

                        video.mv(uploadPath, (err) => {
                            if (err) {
                                invalidMsg += err + '</br>';
                            }
                        });
                    }
                }
                /* Video validation end here */

                returnObj['invalidMsg'] = invalidMsg;
                return returnObj;
            } else {
                returnObj['invalidMsg'] = 'Video upload field is required!';
                return returnObj;
            }
        } catch (err) {
            error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
            res.status(500).json({ status: 2, msg: 'File uploading failed! Server failure.' });
            res.end();
        }
    }
}