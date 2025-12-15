// // C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\routes\registrationRoutes.js

// const express = require('express');
// const router = express.Router();
// const registrationController = require('../controllers/registrationController');
// // Assuming your authentication middleware is named authMiddleware
// const authMiddleware = require('../middleware/authMiddleware'); 

// // Route to handle registration submission (POST request)
// // The middleware chain order is CRITICAL:
// // 1. authMiddleware: Verifies the token and adds req.user.id
// // 2. uploadIDProof: Handles the multipart form data and file upload, adds req.file
// // 3. submitRegistration: Saves text data and file path to MongoDB
// router.post(
//     '/register', 
//     authMiddleware, 
//     registrationController.uploadIDProof, 
//     registrationController.submitRegistration
// );

// module.exports = router;

// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\routes\registrationRoutes.js - FINAL FIX

const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const authMiddleware = require('../middleware/authMiddleware'); 

// Route to handle registration submission (POST request)
// The URL will now be: /api/register + / = /api/register
router.post(
    '/', // <-- CRITICAL FIX: Changed from '/register' to '/'
    authMiddleware, 
    registrationController.uploadIDProof, 
    registrationController.submitRegistration
);

module.exports = router;