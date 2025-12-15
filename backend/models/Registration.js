// // C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\models\Registration.js

// const mongoose = require('mongoose');

// // Define a Sub-Schema for the Runner Details to match the controller's logic
// const RunnerDetailsSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     parentName: { type: String }, // From Individual form
//     parentPhone: { type: String }, // From Individual form
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     whatsapp: { type: String },
//     dob: { type: Date, required: true }, // Date of Birth
//     gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
//     bloodGroup: { type: String },
//     nationality: { type: String, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//     country: { type: String, default: 'Indian' },
//     experience: { type: String },
//     finishTime: { type: String },
//     dietary: { type: String },
//     tshirtSize: { type: String, required: true },
// });

// // Define a Sub-Schema for ID Proof details
// const IDProofSchema = new mongoose.Schema({
//     idType: { type: String, required: true }, // Aadhaar, PAN, Passport
//     idNumber: { type: String, required: true }, // The actual number
//     path: { type: String, required: true } // The file path stored by Multer
// });


// const RegistrationSchema = new mongoose.Schema({
//     // Link the registration to the User model
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//         unique: true // Ensures one user can only register once
//     },
    
//     // NEW FIELD: Stores the type of registration (Individual, Group, Charity)
//     registrationType: {
//         type: String,
//         required: true,
//         enum: ['individual', 'group', 'charity']
//     },
    
//     // RETAINED: Race ID or Category Name
//     raceCategory: { // Storing the full name of the race category
//         type: String,
//         required: true,
//         // You should validate this against your raceCategories list if possible
//     },

//     // NEW FIELD: Embed all runner details using the Sub-Schema
//     runnerDetails: {
//         type: RunnerDetailsSchema,
//         required: true,
//     },
    
//     // NEW FIELD: Embed ID proof and file path
//     idProof: {
//         type: IDProofSchema,
//         required: true,
//     },

//     // Registration/Payment status
//     registrationStatus: {
//         type: String,
//         default: 'Pending Payment', // Use a clearer name
//         enum: ['Pending Payment', 'Awaiting Verification', 'Verified', 'Rejected']
//     },
    
//     // Group/Charity specific fields would be added here if needed
//     // Example: groupName: { type: String }

//     registeredAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Registration', RegistrationSchema);

// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\models\Registration.js - FINAL CORRECTED VERSION

// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\backend\models\Registration.js - FINAL CORRECTED VERSION

const mongoose = require('mongoose');

// Define Sub-Schemas (Runner and ID Proof schemas remain unchanged)
const RunnerDetailsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    parentName: { type: String }, 
    parentPhone: { type: String }, 
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    dob: { type: Date, required: true }, 
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    bloodGroup: { type: String },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'Indian' },
    experience: { type: String },
    finishTime: { type: String },
    dietary: { type: String },
    tshirtSize: { type: String, required: true },
});

const IDProofSchema = new mongoose.Schema({
    idType: { type: String, required: true }, 
    idNumber: { type: String, required: true }, 
    path: { type: String, required: true } 
});

// 🛑 CRITICAL FIX: Define the Sub-Schema for Payment Details
const PaymentDetailsSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true }, 
    signature: { type: String }, // Razorpay signature
    status: { type: String, default: 'success' },
    paidAt: { type: Date, default: Date.now },
}, { _id: false }); 


const RegistrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
    },
    
    registrationType: {
        type: String,
        required: true,
        enum: ['individual', 'group', 'charity']
    },
    
    raceCategory: { 
        type: String,
        required: true,
    },

    runnerDetails: {
        type: RunnerDetailsSchema,
        required: true,
    },
    
    idProof: {
        type: IDProofSchema,
        required: true,
    },
    
    // 🛑 CRITICAL FIX: Add the paymentDetails field to the main schema
    paymentDetails: {
        type: PaymentDetailsSchema,
        required: false, 
    },

    registrationStatus: {
        type: String,
        default: 'Pending Payment', 
        enum: ['Pending Payment', 'Awaiting Verification', 'Verified', 'Rejected']
    },
    
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Registration', RegistrationSchema);