// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors'); 

// dotenv.config(); 

// const authRoutes = require('./routes/authRoutes');

// const app = express();
// const PORT = process.env.PORT || 8000;
// const MONGO_URI = process.env.MONGO_URI; 

// // --- CRITICAL MIDDLEWARE ORDER ---

// // 1. Universal CORS (MUST be the simplest setting to eliminate config errors)
// app.use(cors()); 

// // 2. JSON Body Parser (MUST be before any routes that process body data)
// app.use(express.json());

// // --- Database Connection ---
// mongoose.connect(MONGO_URI)
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => console.error('MongoDB connection error:', err.message)); 

// // --- Routes ---
// app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//     res.send('Marathon Project Backend Running!');
// });

// // --- Start Server ---
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

// // payment connection
// const paymentRoutes = require("./routes/paymentRoutes");

// app.use("/api/payment", paymentRoutes);

// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\server.js - DEFINITIVE CORRECT CODE

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const path = require('path'); // Essential for robust file serving

dotenv.config(); 

// --- 1. IMPORT ROUTES ---
const authRoutes = require('./routes/authRoutes');
const registrationRoutes = require('./routes/registrationRoutes'); 
const paymentRoutes = require('./routes/paymentRoutes'); 

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI; 

// --- CRITICAL MIDDLEWARE ORDER ---

// 1. Universal CORS 
app.use(cors()); 

// 2. JSON Body Parser (for parsing incoming JSON data)
app.use(express.json());

// 3. URL Encoded Body Parser 
app.use(express.urlencoded({ extended: true }));

// 4. File serving for Multer uploads (CRITICAL for images/ID files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Database Connection ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message)); 

// --- 2. MOUNT ALL ROUTES (FIXED) ---

// a. Authentication (MISSING in your provided code, now correctly added)
app.use('/api/auth', authRoutes); 

// b. Registration (Prefix: /api/register)
app.use('/api/register', registrationRoutes); 

// c. Payment (Prefix: /api/payment - Removed the duplicate entry)
app.use('/api/payment', paymentRoutes); 


// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Marathon Project Backend Running!');
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});