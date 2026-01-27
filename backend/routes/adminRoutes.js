// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard-data', authMiddleware, adminMiddleware, adminController.getAdminDashboardData);

module.exports = router;