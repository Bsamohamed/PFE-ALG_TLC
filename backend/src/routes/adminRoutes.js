const express = require('express');
const router = express.Router();
const { loginAdmin, changePassword, getAdminProfile } = require('../controllers/adminController'); // ✅ importer tout en une ligne
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/login', loginAdmin);
router.post('/change-password', changePassword);
router.get('/me', authenticateToken, getAdminProfile);

module.exports = router;
