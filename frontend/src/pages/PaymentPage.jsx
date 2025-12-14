import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Safe destructuring
  const {
    amount = 0,
    raceCategory = "",
    registrationType = "",
    groupName = "",
  } = location.state || {};

  // ❌ Block direct access
  if (!location.state || amount <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Invalid access. Please register first.
        </p>
      </div>
    );
  }

  const handlePayment = async () => {
    if (loading) return;
    setLoading(true);

    try {
      console.log("Creating order for amount:", amount);

      // 1️⃣ Create order from backend
      const response = await api("/api/payment/create-order", {
        method: "POST",
        body: { amount },
      });

      console.log("Backend response:", response);

      const { key, order } = response;

      // 2️⃣ Validate response properly
      if (!key || !order || !order.id || !order.amount) {
        throw new Error("Invalid order response from backend");
      }

      // 3️⃣ Ensure Razorpay SDK exists
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please refresh.");
        return;
      }

      // 4️⃣ Razorpay options (TEST MODE)
      const options = {
        key, // ✅ backend test key
        amount: order.amount, // paise
        currency: "INR",
        name: "Sprints Saga India",
        description: "Marathon Registration",
        order_id: order.id,
        handler: function (res) {
          console.log("Payment success:", res);
          alert("Payment Successful (Test Mode)");

          // 🔜 Later:
          // verify payment on backend
          // navigate("/payment-success");
        },
        theme: {
          color: "#0d9488",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
