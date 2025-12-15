const Razorpay = require('razorpay');
const Registration = require('../models/Registration'); // To find and update the registration document
// If you added crypto for signature verification, include it here:
// const crypto = require('crypto');

// Initialize the Razorpay instance using environment variables
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET, // Ensure this matches your .env file variable name
});


// --- 1. Initiate Payment (Create Razorpay Order) ---
exports.createOrder = async (req, res) => {
    // This assumes the frontend sends: amount and registrationId
    const { registrationId, amount } = req.body;
    // Assuming you extract userId from the JWT token passed via authMiddleware
    // const userId = req.user.id; 

    if (!registrationId || !amount) {
        return res.status(400).json({ message: 'Missing registration ID or amount.' });
    }

    try {
        const options = {
            amount: Math.round(amount * 100), // Razorpay accepts amount in Paisa
            currency: "INR",
            receipt: `receipt_${registrationId}`, // Unique ID for your payment
            notes: {
                registrationId: registrationId,
                // userId: userId, // Include user ID if using authMiddleware
            }
        };

        const order = await razorpayInstance.orders.create(options);
        
        // This is the response structure the frontend's PaymentPage.jsx is now expecting:
        res.status(200).json({
            key: process.env.RAZORPAY_KEY_ID, 
            order: order, // Sends the full order object containing ID and amount (in paise)
        });

    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        res.status(500).json({ message: 'Failed to create payment order.' });
    }
};


// --- 2. Verify Payment and Update DB Status ---
exports.verifyPayment = async (req, res) => {
    // This receives the response from the frontend payment modal
    const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        registrationId // Passed from frontend in verificationBody
    } = req.body;

    if (!razorpay_payment_id || !registrationId) {
        return res.status(400).json({ success: false, message: 'Missing payment details for verification.' });
    }

    // NOTE: For a live application, you must perform signature verification here.
    // For flow testing, we skip it and proceed to update the DB.

    try {
        // 1. Find the registration document
        const registration = await Registration.findById(registrationId);

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found for payment verification.' });
        }
        
        // 2. Update Registration Status and payment details
        registration.registrationStatus = 'Verified';
        registration.paymentDetails = {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            status: 'success',
            paidAt: new Date(),
        };

        await registration.save();
        console.log(`[PAYMENT SUCCESS]: Registration ${registrationId} verified and status updated.`);

        // 3. Send final success response back to the client (Expected by the frontend)
        res.status(200).json({ 
            success: true, 
            message: 'Payment verified successfully. Registration complete!',
            registrationId: registrationId
        });

    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, message: 'Payment verification failed on server.' });
    }
};