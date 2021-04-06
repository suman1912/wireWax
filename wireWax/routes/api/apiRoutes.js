const express = require('express');
const router = express.Router();

const rootDir = require('../../helpers/path');
const apiSanitizeCSRF = require(`${rootDir}/middlewares/apiSanitizeCSRF`);

const getMethod = require(`${rootDir}/controllers/api/v1/getApiController`);
const postMethod = require(`${rootDir}/controllers/api/v1/postApiController`);

router.get('/get-data', getMethod.getGraphicsMarkupFilteredData);
router.get('*', getMethod.pageNotFound404);

module.exports = router;