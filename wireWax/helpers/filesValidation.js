const fs = require('fs');
const _path = require('path');

module.exports = {
    fileValidator: (reqData, path) => {
        //console.log(reqData);
        let returnObj = {};
        if (reqData) {
            let image = reqData.image,
                imageFileName = null,
                imgTypeList = ['.png', '.jpg', '.jpeg', '.gif', '.JGEG', '.JPG', '.PNG', '.GIF', '.jfif'], /* Write image file type here */
                imageSize = 102400, /* Write image file size here */
                validImageFile = true,

                audio = reqData.audio,
                audioFileName = null,
                audioTypeList = ['.mpeg', '.x-m4a', '.mp3', '.MPEG', '.X-M4A', '.MP3'], /* Write audio file type here */
                audioSize = 102400, /* Write audio file size here */
                validAudioFile = true,

                audioHindi = reqData.audioHindi,
                validAudioHindiFile = true,
                audioFileNameHindi = null,

                audioOdia = reqData.audioOdia,
                validAudioOdiaFile = true,
                audioFileNameOdia = null,

                audioHo = reqData.audioHo,
                validAudioHoFile = true,
                audioFileNameHo = null,

                audioSanthali = reqData.audioSanthali,
                validAudioSanthaliFile = true,
                audioFileNameSanthali = null,

                video = reqData.video,
                videoFileName = null,
                videoTypeList = ['.3gpp2', '.mp4', '.mpeg', '.x-ms-wmv', '.mkv', '.MKV', 'MP4'], /* Write video file type here */
                videoSize = 1024000, /* Write video file size here */
                validVideoFile = true,

                rawPath = path,
                invalidMsg = "";

            /* Image validation start here */
            returnObj['imageName'] = imageFileName;
            if (image) {
                let extImageName = _path.extname(image.name);
                if (image.size > imageSize) {
                    invalidMsg += 'Image size should be less than 100 KB.</br>';
                    validImageFile = false;
                }

                if (!imgTypeList.includes(extImageName)) {
                    //fs.unlinkSync(targetFile.tempFilePath);
                    invalidMsg += "Image file type should be .png, .jpg, .jpeg, .JGEG, .JPG, .PNG .</br>";
                    validImageFile = false;
                }

                if (validImageFile) {
                    imageFileName = image.md5 + image.name;
                    uploadPath = rawPath + imageFileName;

                    returnObj['imageName'] = imageFileName;

                    image.mv(uploadPath, (err) => {
                        if (err) {
                            invalidMsg += err + '</br>';
                        }
                    });
                }
            }
            /* Image validation end here */

            /* Audio validation start here */
            returnObj['audioName'] = audioFileName;
            if (audio) { //English
                let extAudioName = _path.extname(audio.name);
                if (audio.size > audioSize) {
                    invalidMsg += 'English audio file size should be less than 100 KB.</br>';
                    validAudioFile = false;
                }

                if (!audioTypeList.includes(extAudioName)) {
                    //fs.unlinkSync(targetFile.tempFilePath);
                    invalidMsg += "English audio file type should be .mpeg, .x-m4a, .mp3, .MPEG, .X-M4A, .MP3.</br>";
                    validAudioFile = false;
                }

                if (validAudioFile) {
                    audioFileName = `audio` + audio.md5 + audio.name;
                    uploadPath = rawPath + audioFileName;

                    returnObj['audioName'] = audioFileName;

                    audio.mv(uploadPath, (err) => {
                        if (err) {
                            invalidMsg += err + '</br>';
                        }
                    });
                }
            }

            returnObj['audioHindi'] = audioFileNameHindi;
            if (audioHindi) { //Hindi
                let extAudioName = _path.extname(audioHindi.name);
                if (audioHindi.size > audioSize) {
                    invalidMsg += 'Hindi audio file size should be less than 100 KB.</br>';
                    validAudioHindiFile = false;
                }

                if (!audioTypeList.includes(extAudioName)) {
                    //fs.unlinkSync(targetFile.tempFilePath);
                    invalidMsg += "Hindi audio file type should be .mpeg, .x-m4a, .mp3, .MPEG, .X-M4A, .MP3.</br>";
                    validAudioHindiFile = false;
                }

                if (validAudioHindiFile) {
                    audioFileNameHindi = `audiohindi` + audioHindi.md5 + audioHindi.name;
                    uploadPath = rawPath + audioFileNameHindi;

                    returnObj['audioHindi'] = audioFileNameHindi;

                    audioHindi.mv(uploadPath, (err) => {
                        if (err) {
                            invalidMsg += err + '</br>';
                        }
                    });
                }
            }

            returnObj['audioOdia'] = audioFileNameOdia;
            if (audioOdia) { //Odia
                let extAudioName = _path.extname(audioOdia.name);
                if (audioOdia.size > audioSize) {
                    invalidMsg += 'Odia audio file size should be less than 100 KB.</br>';
                    validAudioOdiaFile = false;
                }

                if (!audioTypeList.includes(extAudioName)) {
                    //fs.unlinkSync(targetFile.tempFilePath);
                    invalidMsg += "Odia audio file type should be .mpeg, .x-m4a, .mp3, .MPEG, .X-M4A, .MP3.</br>";
                    validAudioOdiaFile = false;
                }

                if (validAudioOdiaFile) {
                    audioFileNameOdia = `audioodia` + audioOdia.md5 + audioOdia.name;
                    uploadPath = rawPath + audioFileNameOdia;

                    returnObj['audioOdia'] = audioFileNameOdia;

                    audioOdia.mv(uploadPath, (err) => {
                        if (err) {
                            invalidMsg += err + '</br>';
                        }
                    });
                }
            }

            returnObj['audioHo'] = audioFileNameHo;
            if (audioHo) { //Ho
                let extAudioName = _path.extname(audioHo.name);
                if (audioHo.size > audioSize) {
                    invalidMsg += 'Ho audio file size should be less than 100 KB.</br>';
                    validAudioHoFile = false;
                }

                if (!audioTypeList.includes(extAudioName)) {
                    //fs.unlinkSync(targetFile.tempFilePath);
                    invalidMsg += "Ho audio file type should be .mpeg, .x-m4a, .mp3, .MPEG, .X-M4A, .MP3.</br>";
                    validAudioHoFile = false;
                }

                if (validAudioHoFile) {
                    audioFileNameHo = `audioho` + audioHo.md5 + audioHo.name;
                    uploadPath = rawPath + audioFileNameHo;

                    returnObj['audioHo'] = audioFileNameHo;

                    audioHo.mv(uploadPath, (err) => {
                        if (err) {
                            invalidMsg += err + '</br>';
                        }
                    });
                }
            }

            returnObj['audioSanthali'] = audioFileNameSanthali;
            if (audioSanthali) { //Santhali
                let extAudioName = _path.extname(audioSanthali.name);
                if (audioSanthali.size > audioSize) {
                    invalidMsg += 'Ho audio file size should be less than 100 KB.</br>';
                    validAudioSanthaliFile = false;
                }

                if (!audioTypeList.includes(extAudioName)) {
                    //fs.unlinkSync(targetFile.tempFilePath);
                    invalidMsg += "Ho audio file type should be .mpeg, .x-m4a, .mp3, .MPEG, .X-M4A, .MP3.</br>";
                    validAudioSanthaliFile = false;
                }

                if (validAudioOdiaFile) {
                    audioFileNameSanthali = `audiosanthali` + audioSanthali.md5 + audioSanthali.name;
                    uploadPath = rawPath + audioFileNameSanthali;

                    returnObj['audioSanthali'] = audioFileNameSanthali;

                    audioSanthali.mv(uploadPath, (err) => {
                        if (err) {
                            invalidMsg += err + '</br>';
                        }
                    });
                }
            }
            /* Audio validation end here */

            /* Video validation start here */
            returnObj['videoName'] = videoFileName;
            if (video) {
                let extVideoName = _path.extname(video.name);
                if (video.size > videoSize) {
                    invalidMsg += 'Video file size should be less than 1 MB.</br>';
                    validVideoFile = false;
                }

                if (!videoTypeList.includes(extVideoName)) {
                    //fs.unlinkSync(targetFile.tempFilePath);
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

            /* Upload description audio files start here */
            for (let i = 0; i <= 4; i++) {
                const descAudio = reqData['descAudio' + i];
                if (descAudio) {
                    let descAudioFileName = `desc` + descAudio.md5 + descAudio.name;
                    uploadPath = rawPath + descAudioFileName;

                    returnObj['descAudio' + i] = descAudioFileName;

                    descAudio.mv(uploadPath, (err) => {
                        if (err) {
                            invalidMsg += err + '</br>';
                        }
                    });
                } else {
                    returnObj['descAudio' + i] = null;
                }
            }
            /* Upload description audio files end here */

            returnObj['invalidMsg'] = invalidMsg;
            return returnObj;
        } else {
            returnObj['invalidMsg'] = 'Image field is required!';
            return returnObj;
        }
    },
    fileUnlink : (path,unlinkFile) => {
        // for(var i = 0; i<unlinkFile.length; i++){
        //     try {
        //         fs.unlinkSync(path+unlinkFile[i]);
        //         console.log('Successfully Deleted');
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
    }
}