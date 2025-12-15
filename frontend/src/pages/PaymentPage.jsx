


// // C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\frontend\src\pages\PaymentPage.jsx

// import React, { useState, useEffect } from "react"; 
// import { useLocation, useNavigate } from "react-router-dom";
// import { api } from "../api";

// // --- Helper function to ensure Razorpay script is loaded ---
// const loadRazorpayScript = () => {
//     if (document.getElementById('razorpay-checkout-script')) {
//         return true;
//     }
//     const script = document.createElement('script');
//     script.id = 'razorpay-checkout-script';
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     document.head.appendChild(script);
//     return new Promise((resolve) => {
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//     });
// };

// function PaymentPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     // ✅ FIX 1: Retrieve registrationId from the navigation state
//     const {
//         amount = 0,
//         raceCategory = "",
//         registrationType = "",
//         registrationId = null, // <--- CRITICAL: Get the ID
//         groupName = "",
//     } = location.state || {};
    
//     // --- Initial Check ---
//     if (!location.state || amount <= 0 || !registrationId) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-red-600 font-semibold">
//                     Invalid access. Please ensure registration is complete.
//                 </p>
//             </div>
//         );
//     }
    
//     // --- Step 3: Send payment details to backend for verification ---
//     const verifyPayment = async (paymentDetails) => {
//         try {
//             const verificationBody = {
//                 ...paymentDetails,
//                 registrationId: registrationId, // Send the registration ID back for DB update
//             };
            
//             // NOTE: Add token if your backend middleware requires it for /api/payment/verify
//             const response = await api("/api/payment/verify", {
//                 method: "POST",
//                 body: verificationBody, 
//                 // token: YOUR_AUTH_TOKEN_HERE, 
//             });

//             if (response.success) {
//                 alert("Payment Verified! Registration Complete.");
//                 // Redirect to a dedicated success page
//                 navigate("/payment-success", { state: { registrationId: registrationId } });
//             } else {
//                  alert("Payment Verification Failed by Server.");
//             }
//         } catch (error) {
//             console.error("Payment Verification Error:", error);
//             alert("Payment Verification Failed. Contact Support.");
//         }
//     };


//     const handlePayment = async () => {
//         if (loading) return;
//         setLoading(true);

//         // Await script loading if not pre-loaded
//         const scriptLoaded = await loadRazorpayScript(); 
//         if (!scriptLoaded) return setLoading(false);


//         try {
//             console.log("Creating order for amount:", amount, " and regId:", registrationId);

//             // 1️⃣ Create order from backend - Pass registrationId
//             const response = await api("/api/payment/order", {
//                 method: "POST",
//                 body: { 
//                     amount: amount, 
//                     registrationId: registrationId 
//                 }, 
//             });

//             console.log("Backend Order Response:", response);

//             const { key, orderId, amount: orderAmount } = response; 

//             // 2️⃣ Validate response properly
//             if (!key || !orderId || !orderAmount) {
//                 throw new Error("Invalid order response from backend");
//             }

//             // 3️⃣ Razorpay options 
//             const options = {
//                 key, 
//                 amount: orderAmount, // The amount in PAISE returned by backend
//                 currency: "INR",
//                 name: "Sprints Saga India",
//                 description: `Marathon Reg for ${raceCategory}`,
//                 order_id: orderId, // Order ID from backend
                
//                 // ✅ Handle success and pass data to verification endpoint
//                 handler: function (response) {
//                     console.log("Payment success details:", response);
//                     verifyPayment(response); // Send details to the new function
//                 },
                
//                 prefill: {
//                     // You can add runner details from the registration flow here if available in state
//                 },
//                 theme: {
//                     color: "#0d9488",
//                 },
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.on('payment.failed', function (response){
//                 console.error("Payment Failed:", response.error);
//                 alert("Payment Failed: " + response.error.description);
//             });
//             rzp.open();
//         } catch (err) {
//             console.error("Payment Error:", err.message);
//             alert(`Payment failed: ${err.message}. Please try again.`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // --- PASTE THE ORIGINAL JSX RENDER HERE ---
//     return (
//         <main className="min-h-screen bg-slate-50 flex justify-center items-center px-4">
//             <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
//                 <h1 className="text-2xl font-extrabold text-teal-700 mb-6 text-center">
//                     Payment Summary
//                 </h1>

//                 <div className="space-y-3 text-sm">
//                     <div className="flex justify-between">
//                         <span className="text-slate-600">Registration Type:</span>
//                         <span className="font-semibold capitalize">
//                             {registrationType}
//                         </span>
//                     </div>

//                     <div className="flex justify-between">
//                         <span className="text-slate-600">Race Category:</span>
//                         <span className="font-semibold">{raceCategory}</span>
//                     </div>

//                     {groupName && (
//                         <div className="flex justify-between">
//                             <span className="text-slate-600">Group Name:</span>
//                             <span className="font-semibold">{groupName}</span>
//                         </div>
//                     )}

//                     <div className="flex justify-between pt-3 border-t">
//                         <span className="text-slate-700 font-semibold">
//                             Total Amount:
//                         </span>
//                         <span className="text-xl font-extrabold text-teal-700">
//                             ₹{amount}
//                         </span>
//                     </div>
//                 </div>

//                 <button
//                     className={`mt-8 w-full rounded-full py-3 text-white font-semibold transition ${
//                         loading
//                             ? "bg-slate-400 cursor-not-allowed"
//                             : "bg-teal-600 hover:bg-teal-700"
//                     }`}
//                     onClick={handlePayment}
//                     disabled={loading}
//                 >
//                     {loading ? "Processing..." : `Pay ₹${amount}`}
//                 </button>

//                 <button
//                     className="mt-3 w-full text-sm text-slate-500 hover:underline"
//                     onClick={() => navigate(-1)}
//                     disabled={loading}
//                 >
//                     Go Back
//                 </button>
//             </div>
//         </main>
//     );
// }

// export default PaymentPage;


// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\frontend\src\pages\PaymentPage.jsx

import React, { useState, useEffect } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";

// --- Helper function to ensure Razorpay script is loaded ---
const loadRazorpayScript = () => {
    if (document.getElementById('razorpay-checkout-script')) {
        return true;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.head.appendChild(script);
    return new Promise((resolve) => {
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
    });
};

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // ✅ Retrieve necessary details from the navigation state
    const {
        amount = 0,
        raceCategory = "",
        registrationType = "",
        registrationId = null, 
        groupName = "",
    } = location.state || {};
    
    // --- Initial Check ---
    if (!location.state || amount <= 0 || !registrationId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 font-semibold">
                    Invalid access. Please ensure registration is complete.
                </p>
            </div>
        );
    }
    
    // --- Step 3: Send payment details to backend for verification ---
    const verifyPayment = async (paymentDetails) => {
        try {
            const verificationBody = {
                ...paymentDetails,
                registrationId: registrationId, 
            };
            
            // NOTE: Add token if your backend middleware requires it for /api/payment/verify
            const response = await api("/api/payment/verify", {
                method: "POST",
                body: verificationBody, 
                // token: YOUR_AUTH_TOKEN_HERE, 
            });

            if (response.success) {
                // alert("Payment Verified! Registration Complete.");
                // Redirect to a dedicated success page
                navigate("/payment-success", { state: { registrationId: registrationId } });
            } else {
                //  alert("Payment Verification Failed by Server.");
            }
        } catch (error) {
            console.error("Payment Verification Error:", error);
            // alert("Payment Verification Failed. Contact Support.");
        }
    };


    const handlePayment = async () => {
        if (loading) return;
        setLoading(true);

        // Await script loading if not pre-loaded
        const scriptLoaded = await loadRazorpayScript(); 
        if (!scriptLoaded) return setLoading(false);


        try {
            console.log("Creating order for amount:", amount, " and regId:", registrationId);

            // 1️⃣ Create order from backend - Pass registrationId
            const response = await api("/api/payment/order", {
                method: "POST",
                body: { 
                    amount: amount, 
                    registrationId: registrationId 
                }, 
            });

            console.log("Backend Order Response:", response);

            // 🛑 CRITICAL FIX APPLIED HERE: Correctly destructure the nested 'order' object
            const { key, order } = response; 
            
            const orderId = order.id;
            const orderAmount = order.amount; // Amount is in paise

            // 2️⃣ Validate response properly
            if (!key || !orderId || !orderAmount) {
                // The previous error occurred here because it was trying to read 'orderId' directly from 'response'
                throw new Error("Invalid order response from backend: Missing key, order ID, or amount.");
            }

            // 3️⃣ Razorpay options 
            const options = {
                key, 
                amount: orderAmount, // The amount in PAISE from the backend
                currency: "INR",
                name: "Sprints Saga India",
                description: `Marathon Reg for ${raceCategory}`,
                order_id: orderId, // The ID from the nested order object
                
                // ✅ Handle success and pass data to verification endpoint
                handler: function (response) {
                    console.log("Payment success details:", response);
                    verifyPayment(response); // Send details to the new function
                },
                
                prefill: {
                    // Pre-fill user data here if available
                },
                theme: {
                    color: "#0d9488",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
                console.error("Payment Failed:", response.error);
                // alert("Payment Failed: " + response.error.description);
            });
            rzp.open();
        } catch (err) {
            console.error("Payment Error:", err.message);
            // alert(`Payment failed: ${err.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    // --- JSX RENDER ---
    return (
        <main className="min-h-screen bg-slate-50 flex justify-center items-center px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                <h1 className="text-2xl font-extrabold text-teal-700 mb-6 text-center">
                    Payment Summary
                </h1>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-600">Registration Type:</span>
                        <span className="font-semibold capitalize">
                            {registrationType}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-slate-600">Race Category:</span>
                        <span className="font-semibold">{raceCategory}</span>
                    </div>

                    {groupName && (
                        <div className="flex justify-between">
                            <span className="text-slate-600">Group Name:</span>
                            <span className="font-semibold">{groupName}</span>
                        </div>
                    )}

                    <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-700 font-semibold">
                            Total Amount:
                        </span>
                        <span className="text-xl font-extrabold text-teal-700">
                            ₹{amount}
                        </span>
                    </div>
                </div>

                <button
                    className={`mt-8 w-full rounded-full py-3 text-white font-semibold transition ${
                        loading
                            ? "bg-slate-400 cursor-not-allowed"
                            : "bg-teal-600 hover:bg-teal-700"
                    }`}
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? "Processing..." : `Pay ₹${amount}`}
                </button>

                <button
                    className="mt-3 w-full text-sm text-slate-500 hover:underline"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                >
                    Go Back
                </button>
            </div>
        </main>
    );
}

export default PaymentPage;