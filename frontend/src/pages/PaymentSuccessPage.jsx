import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Optional: If you need to fetch full details using the registration ID
// import { api } from '../api'; 

function PaymentSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Safely retrieve the registrationId passed via navigate state
    const { registrationId } = location.state || {};

    // For display (you can replace this with fetched data later)
    const transactionIdDisplay = "PAY_SUCCESS_ID_FROM_DB"; 

    // --- Safety Check: Ensure we have an ID ---
    if (!registrationId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
                <div className="text-center bg-white p-10 rounded-xl shadow-lg border border-red-200">
                    <h1 className="text-3xl font-extrabold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-slate-600 mb-6">
                        Could not find a valid registration ID. Please check your dashboard or contact support.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }
    
    // --- Success Display ---
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-teal-50 p-6">
            <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-2xl border border-teal-100">
                
                {/* Checkmark Icon */}
                <div className="mx-auto w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-extrabold text-teal-700 mb-3">
                    Registration Successful!
                </h1>
                
                <p className="text-slate-700 mb-6">
                    Your payment has been successfully verified, and your spot in the marathon is confirmed.
                </p>

                <div className="bg-slate-50 p-4 rounded-lg text-left text-sm space-y-2 mb-8">
                    <p>
                        <span className="font-semibold text-slate-600">Registration ID:</span> 
                        <span className="float-right text-teal-600 font-mono">{registrationId}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-slate-600">Transaction ID:</span> 
                        <span className="float-right text-slate-800 font-mono">{transactionIdDisplay}</span> 
                    </p>
                </div>
                
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-full transition shadow-md"
                >
                    View Dashboard
                </button>
                
            </div>
        </main>
    );
}

export default PaymentSuccessPage;