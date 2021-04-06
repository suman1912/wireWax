const fs = require('fs');
const rootDir = require('../../../helpers/path');
const error = require(`${rootDir}/helpers/error`);

const fileName = __filename.slice(__dirname.length + 1, -3);

const City = require(`${rootDir}/models/City`);
const Block = require(`${rootDir}/models/Block`);
const GramPanchayat = require(`${rootDir}/models/GramPanchayat`);

const Crop = require(`${rootDir}/models/Crop`);
const CropStep = require(`${rootDir}/models/CropStep`);
const CropStepMaterial = require(`${rootDir}/models/CropStepMaterial`);

const LiveStock = require(`${rootDir}/models/LiveStock`);
const LiveStockBreed = require(`${rootDir}/models/LiveStockBreed`);
const BreedCategory = require(`${rootDir}/models/BreedCategory`);
const LiveStockStep = require(`${rootDir}/models/LiveStockStep`);
const LiveStockStepMaterial = require(`${rootDir}/models/LiveStockStepMaterial`);
const Vaccination = require(`${rootDir}/models/Vaccination`);

const ImportantLink = require(`${rootDir}/models/ImportantLink`);

const NutrationGraden = require(`${rootDir}/models/NutritionGraden`);

const Label = require(`${rootDir}/models/Label`);

const SmallBusinessCategory = require(`${rootDir}/models/SmallBusinessCategory`);
const SmallBusinessSubCategory = require(`${rootDir}/models/SmallBusinessSubCategory`);
const DryFish = require(`${rootDir}/models/DryFishSelling`);
const VegetableVending = require(`${rootDir}/models/VegetableVending`);
const SmallGroceryShop = require(`${rootDir}/models/SmallGroceryShop`);

const SmsTemplate = require(`${rootDir}/models/SmsTemplate`);

const Notification = require(`${rootDir}/models/Notification`);

/* Get crops data by this function */
exports.crops = (req, res, next) => {
    let lang = req.headers['accept-language'],
        name = `name${lang}`,
        audio = `audio${lang}`;

    Crop.find({ status: 1 }).select(`${name} ${audio} imageFile`).then(results => {
        res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: results });
        res.end();
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}

/* Get crop steps and materials data by this function */
exports.cropStepsMaterials = (req, res, next) => {
    const info = req.params.id,
        step = req.params.step;
    CropStepMaterial.find({ status: 1, 'stepData.cropData._id': info }).then(results => {
        res.status(200).json({ status: 1, msg: 'Data fetched successfully. here', data: results[step] });
        res.end();
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}

/* Get livestock data by this function */
exports.livestock = (req, res, next) => {
    let lang = req.headers['accept-language'],
        name = `name${lang}`,
        audio = `audio${lang}`;

    LiveStock.find({ status: 1 }).select(`${name} ${audio} imageFile`).then(results => {
        res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: results });
        res.end();
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}

/* Get livestock steps and materials data by this function */
exports.livestockStepsMaterials = (req, res, next) => {
    const info = req.params.id;
    LiveStockStepMaterial.find({ status: 1, 'livestockStepData.liveStockData._id': info }).then(results => {
        res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: results });
        res.end();
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}

/* Get livestock breeds data by this function */
exports.livestockBreeds = (req, res, next) => {
    const info = req.params.id;
    LiveStockBreed.find({ status: 1, 'livestockData._id': info }).select('-status -created_at -updated_at').then(results => {
        res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: results });
        res.end();
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}

/* Get livestock breeed categories data by this function */
exports.breedsCategories = (req, res, next) => {
    const info = req.params.id;
    BreedCategory.find({ status: 1, 'breedData._id': info }).then(results => {
        res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: results });
        res.end();
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}

/* Get important links data by this function */
exports.importantLinks = (req, res, next) => {
    const info = req.params.type;
    let lang = req.headers['accept-language'],
        name = `category${lang}`,
        audio = `audio${lang}`;

    ImportantLink.find({ status: 1, type: info }).select(`${name} ${audio} image link`).then(results => {
        res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: results });
        res.end();
    }).catch(err => {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    });
}

/* Get all data by this function */
exports.getAllData = async (req, res, next) => {
    try {
        const getCrops = await Crop.find({ status: 1 }).select('-created_at -updated_at -status');
        const getCropSteps = await CropStep.find({ status: 1 }).select('-created_at -updated_at -status');
        const getCropsMaterials = await CropStepMaterial.find({ status: 1 }).select('-created_at -updated_at -status');

        const getLivestock = await LiveStock.find({ status: 1 }).select('-created_at -updated_at -status');
        const getLivestockStep = await LiveStockStep.find({ status: 1 }).select('-created_at -updated_at -status');
        const getLiveStockStepMaterial = await LiveStockStepMaterial.find({ status: 1 }).select('-created_at -updated_at -status');
        const getLiveStockBreed = await LiveStockBreed.find({ status: 1 }).select('-status -created_at -updated_at');
        const getLivestockBreedCategory = await BreedCategory.find({ status: 1 }).select('-status -created_at -updated_at');

        const getImportantLink = await ImportantLink.find({ status: 1 }).select('-status -created_at -updated_at');

        const getNutrationGarden = await NutrationGraden.find({ status: 1 }).select('-status -created_at -updated_at');

        const getLabels = await Label.find({ status: 1 }).select('-status -created_at -updated_at');

        const getVaccination = await Vaccination.find({ status: 1 }).select('-status -created_at -updated_at');

        const getBlock = await Block.find({ status: 1 }).select('-state -district -password -status -created_at -updated_at');

        const getDryFish = await DryFish.find({ status: 1 }).select('-status -created_at -updated_at');
        const getVegetableVending = await VegetableVending.find({ status: 1 }).select('-status -created_at -updated_at');
        const getSmallGroceryShop = await SmallGroceryShop.find({ status: 1 }).select('-status -created_at -updated_at');
        const getSmallBusinessCategory = await SmallBusinessCategory.find({ status: 1 }).select('-status -created_at -updated_at');
        const getSmallBusinessSubCategory = await SmallBusinessSubCategory.find({ status: 1 }).select('-status -created_at -updated_at');
        const getSmsTemplate = await SmsTemplate.find({ status: 1 }).select('-status -created_at -updated_at');

        res.status(200).json({
            status: 1,
            msg: 'Data fetched successfully.',
            crops: getCrops,
            cropSteps: getCropSteps,
            cropsMaterials: getCropsMaterials,
            livestock: getLivestock,
            livestockStep: getLivestockStep,
            liveStockStepMaterials: getLiveStockStepMaterial,
            liveStockBreeds: getLiveStockBreed,
            breedCategories: getLivestockBreedCategory,
            importantLinks: getImportantLink,
            nutrationGraden: getNutrationGarden,
            labels: getLabels,
            vaccination: getVaccination,
            contactList: getBlock,
            dryFish: getDryFish,
            vegetableVending: getVegetableVending,
            smallGroceryShop: getSmallGroceryShop,
            smsTemplate: getSmsTemplate,
            smallBusinessCategory: getSmallBusinessCategory,
            smallBusinessSubCategory: getSmallBusinessSubCategory
        });
        res.end();
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get state, district and block data */
exports.getZones = async (req, res, next) => {
    try {
        const getStates = await City.find().select('state -_id');
        let states = new Object();
        states.state = new Array();
        // Assign states.state to getStates for brevity
        let myData = getStates;
        states.state = Array.from(new Set(myData.map(JSON.stringify))).map(JSON.parse);

        res.status(200).json({
            status: 1,
            msg: 'Data fetched successfully.',
            states: states.state
        });
        res.end();
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get districts by passing the state */
exports.getDistricts = async (req, res, next) => {
    try {
        const getDistricts = await City.find({ state: req.query.state }).sort({ district: 1 }).select('district -_id');

        res.status(200).json({
            status: 1,
            msg: 'Data fetched successfully.',
            districts: getDistricts,
        });
        res.end();
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get blocks by passing the district */
exports.getBlocks = async (req, res, next) => {
    try {
        const getBlocks = await Block.find({ status: 1, district: req.query.district }).sort({ block: 1 }).select('-state -district -fieldOfficerData -created_at -updated_at -status');
        res.status(200).json({
            status: 1,
            msg: 'Data fetched successfully.',
            blocks: getBlocks,
        });
        res.end();
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get gram panchayats by passing the block */
exports.getGramPanchayats = async (req, res, next) => {
    try {
        const getGramPanchayat = await GramPanchayat.find({ status: 1, 'blockData.block': req.query.block }).sort({ gramPanchayat: 1 }).select('-villageData -blockData -created_at -updated_at -status');
        res.status(200).json({
            status: 1,
            msg: 'Data fetched successfully.',
            gramPanchayats: getGramPanchayat,
        });
        res.end();
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get villages by passing the gram panchayat */
exports.getGramPanchayatVillages = async (req, res, next) => {
    try {
        const getGramPanchayat = await GramPanchayat.find({ status: 1, gramPanchayat: req.query.panchayat }).sort({ 'villageData.village': 1 }).select('villageData -_id');
        res.status(200).json({
            status: 1,
            msg: 'Data fetched successfully.',
            villages: getGramPanchayat[0].villageData
        });
        res.end();
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get user notification by passing the user id */
exports.getUserNotifiction = async (req, res, next) => {
    let info = req.query.info;
    console.log(info);
    try {
        const getNotification = await Notification.find({ 'userData._id': info, 'userData.seenStatus': 0 }, { "userData.$": 1 }).select('notificationEnglish notificationHindi notificationOdia notificationHo notificationSanthali created_at');
        res.status(200).json({
            status: 1,
            msg: 'Data fetched successfully.',
            notifications: getNotification
        });
        res.end();
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get get all module files name from folder by this function */
exports.getFilesNames = async (req, res, next) => {
    let arr = [];
    try {
        let name = 'crops',
            filePath = `${rootDir}/public/uploads/${name}/`,
            downloadPath = `/app-property/uploads/${name}/`;
        name = 'crop';
        let obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'steps';
        filePath = `${rootDir}/public/uploads/crops/${name}/`;
        downloadPath = `/app-property/uploads/crops/${name}/`;
        name = 'cropStep';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'materials';
        filePath = `${rootDir}/public/uploads/crops/${name}/`;
        downloadPath = `/app-property/uploads/crops/${name}/`;
        name = 'cropMaterial';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'livestocks';
        filePath = `${rootDir}/public/uploads/${name}/`;
        downloadPath = `/app-property/uploads/${name}/`;
        name = 'livestock';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'steps';
        filePath = `${rootDir}/public/uploads/livestocks/${name}/`;
        downloadPath = `/app-property/uploads/livestocks/${name}/`;
        name = 'livestockStep';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'materials';
        filePath = `${rootDir}/public/uploads/livestocks/${name}/`;
        downloadPath = `/app-property/uploads/livestocks/${name}/`;
        name = 'livestockMaterial';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'breeds';
        filePath = `${rootDir}/public/uploads/livestocks/${name}/`;
        downloadPath = `/app-property/uploads/livestocks/${name}/`;
        name = 'breed';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'expenditure';
        filePath = `${rootDir}/public/uploads/${name}/`;
        downloadPath = `/app-property/uploads/${name}/`;
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'important-links';
        filePath = `${rootDir}/public/uploads/${name}/`;
        downloadPath = `/app-property/uploads/${name}/`;
        name = 'importantLink';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'label';
        filePath = `${rootDir}/public/uploads/${name}/`;
        downloadPath = `/app-property/uploads/${name}/`;
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'nutrition-garden';
        filePath = `${rootDir}/public/uploads/${name}/`;
        downloadPath = `/app-property/uploads/${name}/`;
        name = 'nutritionGarden';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'small-business';
        filePath = `${rootDir}/public/uploads/${name}/`;
        downloadPath = `/app-property/uploads/${name}/`;
        name = 'smallBusiness';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);

        name = 'static';
        filePath = `${rootDir}/public/uploads/${name}/`;
        downloadPath = `/app-property/uploads/${name}/`;
        name = 'staticImages';
        obj = await getFiles(filePath, downloadPath, name);
        arr.push(obj);
        /*obj = {
            name: 'staticURL',
            path: "",
            fileNames: [
                'https://image.freepik.com/free-photo/fresh-green-vegetables-produce-greenhouse-garden-nursery-farm_33829-312.jpg',
                'https://www.jing.fm/clipimg/detail/172-1723685_links-useful-links-icon-png.png',
                'https://cdn.dnaindia.com/sites/default/files/styles/third/public/2019/05/21/826028-rupee-thinkstock.jpg',
                'http://static.agrostar.in/static/KV%2020%20April%202020kv.jpg',
                'https://boostlikes-bc85.kxcdn.com/blog/wp-content/uploads/2017/06/Automatically-Message-Facebook-Fans.jpg',
                'https://www.kisaanhelpline.com/news_image/20012020020200fertilisers-bccl.jpg',
                'https://pbs.twimg.com/media/Evsaf-4UcAMrsvC.jpg',
                'https://sarkariyojanas.com/wp-content/uploads/2019/11/Dairy-Entrepreneurship-Development-Scheme.jpg',
                'https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_720,h_396/https://surejob.in/wp-content/uploads/2017/12/handicrafts_small_business.jpg',
                'http://ttol.vietnamnetjsc.vn//2017/05/15/06/58/bien-toi-thanh-dau-9-loi-ich-vo-cung-bat-ngo-ban-nen-biet_5.jpg',
                'https://spontaneousorder.in/wp-content/uploads/2020/02/Swatantra.jpg',
                'https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_838(1).jpg',
                'https://www.sba.gov/build/71bd57d80e04f91d53641835ce6d7acc.png',
                'https://images.hu-production.be/static/img/home/homepageicons-03.png',
                'https://prod-discovery.edx-cdn.org/media/course/image/ee4f4f12-e6ec-45ac-94df-b90b4b022903-aaf6257f767b.jpeg',
                'https://cdn.corporatefinanceinstitute.com/assets/Loans-1.jpeg',
                'https://img.theweek.in/content/dam/week/news/biz-tech/images/2019/2/1/pension-plan.jpg',
                'https://logos.flamingtext.com/Word-Logos/others-design-sketch-name.png',
                'https://www.cdc.gov/handwashing/images/GettyImages-514363103-medium.jpg',
                'https://drmehtablog.com/wp-content/uploads/2016/01/Cardiology-1.jpg',
                'https://www.universiteitleiden.nl/binaries/content/gallery/ul2/main-images/campus-the-hague/bsk/covid---19-afbeelding.jpg',
                'https://empiawards.files.wordpress.com/2014/05/indian-health-care.jpg'
            ]
        }
        arr.push(obj);*/

        return res.status(200).json({ status: 1, msg: 'Data fetched successfully.', data: arr });
    } catch (err) {
        error.logError(fileName, err.stack.toString()); // Write error detail to passing the errors after calling this function start here 
        res.status(500).json({ status: 2, msg: 'Server authentication failed! Please try again.' });
        res.end();
    }
}

/* Get global files object by this function */
function getFiles(filePath, downloadPath, name) {
    return new Promise((resolve, reject) => {
        let getfilesName = fs.readdirSync(filePath);
        if (getfilesName) {
            let obj = {
                name,
                path: downloadPath,
                fileNames: getfilesName
            };
            resolve(obj);
        }
        reject(getfilesName);
    });
}