const express = require('express');
const router = express.Router();
const { getRadacctData } = require('../controllers/anomalyController');
const { exportRadacctToJson } = require('../controllers/anomalyController');
const { checkAnomalies } = require('../controllers/anomalyController');





router.get('/radacct', getRadacctData);
router.get('/export', exportRadacctToJson);
router.get('/detect', checkAnomalies);

module.exports = router;
