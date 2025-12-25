

// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\routes\registrationRoutes.js - FINAL FIX

const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const authMiddleware = require('../middleware/authMiddleware'); 

// Route to handle registration submission (POST request)
// The URL will now be: /api/register + / = /api/register
router.post(
  '/',               // ✅ correct
  authMiddleware,
  registrationController.uploadIDProof,
  registrationController.submitRegistration
);

module.exports = router;