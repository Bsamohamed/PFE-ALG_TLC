const express = require('express');
const router = express.Router();
const { loginRadius } = require('../controllers/authRadiusController');

router.post('/radius-login', loginRadius);

module.exports = router;
