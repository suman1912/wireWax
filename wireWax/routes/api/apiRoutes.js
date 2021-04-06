const express = require('express');
const router = express.Router();

const rootDir = require('../../helpers/path');
const apiSanitizeCSRF = require(`${rootDir}/middlewares/apiSanitizeCSRF`);

const validator = require(`${rootDir}/middlewares/validator`);

const auth = require(`${rootDir}/controllers/api/v1/apiAuthController`);
const getMethod = require(`${rootDir}/controllers/api/v1/getApiController`);
const postMethod = require(`${rootDir}/controllers/api/v1/postApiController`);

router.post('/signin', apiSanitizeCSRF.checkHeaders, auth.signin);
router.post('/signup', apiSanitizeCSRF.checkHeaders, auth.signup);
router.post('/change-password', apiSanitizeCSRF.checkTokens, validator.validate('changePassword'), auth.changePassword);
router.get('/get-custodian/:deviceID', auth.getCustodian);

router.get('/get-all-data', apiSanitizeCSRF.checkTokens, getMethod.getAllData);

router.get('/crops', apiSanitizeCSRF.checkTokens, getMethod.crops);
router.get('/crop/steps/materials/:id/:step', apiSanitizeCSRF.checkTokens, getMethod.cropStepsMaterials);

router.get('/livestocks', apiSanitizeCSRF.checkTokens, getMethod.livestock);
router.get('/livestocks/breeds/:id', apiSanitizeCSRF.checkTokens, getMethod.livestockBreeds);
router.get('/livestocks/breed/categories/:id', apiSanitizeCSRF.checkTokens, getMethod.breedsCategories);
router.get('/livestocks/steps/materials/:id', apiSanitizeCSRF.checkTokens, getMethod.livestockStepsMaterials);

router.get('/important-links/:type', apiSanitizeCSRF.checkTokens, getMethod.importantLinks);

router.get('/zones', apiSanitizeCSRF.checkHeaders, getMethod.getZones);
router.get('/districts', apiSanitizeCSRF.checkHeaders, getMethod.getDistricts);
router.get('/blocks', apiSanitizeCSRF.checkHeaders, getMethod.getBlocks);
router.get('/gram-panchayats', apiSanitizeCSRF.checkHeaders, getMethod.getGramPanchayats);
router.get('/villages', apiSanitizeCSRF.checkHeaders, getMethod.getGramPanchayatVillages);

router.get('/notifications', apiSanitizeCSRF.checkTokens, getMethod.getUserNotifiction);

router.get('/files', getMethod.getFilesNames);

router.post('/verify-otp', apiSanitizeCSRF.checkHeaders, postMethod.verifyOTP);
router.post('/resend-otp', apiSanitizeCSRF.checkHeaders, postMethod.resendOTP);
router.post('/sync-data', apiSanitizeCSRF.checkHeaders, postMethod.storeSyncData);

module.exports = router;