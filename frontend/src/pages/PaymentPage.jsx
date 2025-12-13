import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Safe destructuring with defaults
  const {
    amount = 0,
    raceCategory = "",
    registrationType = "",
    groupName = "",
  } = location.state || {};

  // ❌ Block direct URL access
  if (!location.state || amount <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Invalid access. Please register first.
        </p>
      </div>
    );
  }

  // ✅ Razorpay handler
  const handlePayment = async () => {
    if (loading) return; // prevent double click
    setLoading(true);

    console.log("Creating order for amount:", amount); // 🔍 DEBUG LOG

    try {
      // 1️⃣ Create order from backend
      const res = await fetch(
        "http://localhost:8000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const order = await res.json();

      // 2️⃣ Validate backend response
      if (!order?.id || !order?.amount) {
        throw new Error("Invalid order response");
      }

      // 3️⃣ Ensure Razorpay SDK is loaded
      if (!window.Razorpay) {
        alert("Payment service not loaded. Please refresh the page.");
        return;
      }

      // 4️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // ✅ ENV-based key
        amount: order.amount, // amount in paise
        currency: "INR",
        name: "Sprints Saga India",
        description: "Marathon Registration",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment Success:", response);
          alert("Payment Successful!");

          // 🔜 NEXT STEP (future)
          // verify payment on backend
          // navigate("/payment-success");
        },
        prefill: {
          email: "", // optional
          contact: "", // optional
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

        {/* ✅ Payment Button */}
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
