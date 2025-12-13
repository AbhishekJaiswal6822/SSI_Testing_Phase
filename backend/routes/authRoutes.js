const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register route (with logs)
router.post('/register', (req, res, next) => {
  console.log('[BACKEND RECEIVING]: POST /api/auth/register hit successfully');
  console.log('Request body:', req.body);
  next();
}, registerUser);

// Login route
router.post('/login', (req, res, next) => {
  console.log('[BACKEND RECEIVING]: POST /api/auth/login hit successfully');
  console.log('Request body:', req.body);
  next();
}, loginUser);

module.exports = router;
