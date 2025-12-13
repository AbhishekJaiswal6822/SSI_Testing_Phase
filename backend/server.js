const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config(); 

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI; 

// --- CRITICAL MIDDLEWARE ORDER ---

// 1. Universal CORS (MUST be the simplest setting to eliminate config errors)
app.use(cors()); 

// 2. JSON Body Parser (MUST be before any routes that process body data)
app.use(express.json());

// --- Database Connection ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message)); 

// --- Routes ---
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Marathon Project Backend Running!');
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// payment connection
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/payment", paymentRoutes);

