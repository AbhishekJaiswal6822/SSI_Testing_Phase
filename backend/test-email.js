// backend/test-email.js
const fs = require('fs');
const path = require('path');
const logoPath = path.join(__dirname, '../frontend/src/assets/logo-Picsart-BackgroundRemover.jpg');
const { sendInvoiceEmail } = require('./services/emailService');
const dotenv = require('dotenv');
dotenv.config();
let base64Logo = "";
try {
    const bitmap = fs.readFileSync(logoPath);
    // 2. Convert to Base64
    base64Logo = `data:image/png;base64,${bitmap.toString('base64')}`;
} catch (err) {
    console.log("Logo file not found at path:", logoPath);
}
const mockData = {
    logo: base64Logo, // This carries the image data
    fullName: "Abhishek Sanjay Jaiswal", 
    phone: "9076402682",
    email: "test@abhishekjaiswal68774.com",
    raceCategory: "21K",
    invoiceNo: `LRCP-21K-${Date.now().toString().slice(-4)}`, // This will fix the 'TEST-INV' issue
    paymentMode: "UPI",
    rawRegistrationFee: 2000,
    discountAmount: 200,
    platformFee: 50,
    pgFee: 42,
    gstAmount: 7.56,
    amount: 1899.56
};

console.log("🚀 Starting Email Test...");

// Change 'your-email@gmail.com' to your actual personal email to see the result
sendInvoiceEmail('your-email@gmail.com', mockData)
    .then(success => {
        if (success) {
            console.log("✅ TEST SUCCESSFUL! Check your inbox (and spam folder).");
        } else {
            console.log("❌ TEST FAILED. Check the console errors above.");
        }
        process.exit();
    })
    .catch(err => {
        console.error("💥 CRITICAL ERROR:", err);
        process.exit(1);
    });