const express = require('express');
const router = express.Router();
const gatewayController = require('../controllers/gatewayController');

router.get('/gateways', gatewayController.getAvailableGateways);

module.exports = router;
