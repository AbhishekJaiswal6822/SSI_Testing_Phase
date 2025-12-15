// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\routes\paymentRoutes.js - CORRECTED

const express = require("express");
const Razorpay = require("razorpay");
// 🛑 CRITICAL FIX: Import the controller file to make verifyPayment available
const paymentController = require('../controllers/paymentController'); 


const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Route for creating the order
router.post("/order", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        
        // Assuming registrationId is also passed in the body for notes, but keeping it simple for now
        const order = await razorpay.orders.create({
            amount: amount * 100, // paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        // This response structure is correct for your fixed PaymentPage.jsx
        return res.status(200).json({
            key: process.env.RAZORPAY_KEY_ID,
            order: order,
        });
    } catch (error) {
        console.error("Razorpay order error:", error);
        res.status(500).json({ error: "Order creation failed" });
    }
});

// 2. CRITICAL NEW ROUTE: For payment verification and DB update
// The function (paymentController.verifyPayment) is now correctly imported and callable.
router.post("/verify", paymentController.verifyPayment);

module.exports = router;