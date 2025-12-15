// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\controllers\authController.js

const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// Controller function for handling user registration
exports.registerUser = async (req, res) => {
    // 1. Get user input from the request body
    const { name, email, password, phone } = req.body;

    // Basic Input Validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    try {
        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email address.' });
        }

        // 3. Create a new user instance
        user = new User({
            name,
            email,
            password,
            phone: phone || null, // Use null if phone is missing
        });

        // 4. Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 5. Save the user to the database
        await user.save();
        
        // **********************************************
        // * FIXED: Generate JWT Token for Autologin *
        // **********************************************
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 6. Respond to the client with the token and user data for autologin
        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully and logged in!',
            token, // <-- ADDED: Token for autologin
            user: { // <-- ADDED: User data for frontend state
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during registration');
    }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ADD THIS LINE for terminal output
    console.log(`[AUTH SUCCESS]: User ${user.email} logged in successfully.`);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
};