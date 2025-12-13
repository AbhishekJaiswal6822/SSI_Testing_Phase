import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

// Pages
import Home from "./Home";
import Register from "./Register";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResultsGallery from "./ResultsGallery";
import AdminDashboard from "./AdminDashboard";
import Accomodation from "./Accomodation";
import AdminAccommodation from "./AdminAccommodation";
import UnderMaintenance from "./UnderMaintenance";
import Faqs from "./Faqs";
import PrivacyPolicy from "./PrivacyPolicy";
import PaymentPage from "./pages/PaymentPage";

// Utilities
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* ROOT WRAPPER (STEP 3 FIX) */}
      <div className="min-h-screen flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/results" element={<ResultsGallery />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/accommodation" element={<Accomodation />} />
            <Route
              path="/admin/accommodation"
              element={<AdminAccommodation />}
            />

            <Route path="/community" element={<UnderMaintenance />} />
            <Route path="/expo" element={<UnderMaintenance />} />
            <Route path="/raceday" element={<UnderMaintenance />} />
            <Route path="/dashboard" element={<UnderMaintenance />} />

            <Route path="/faqs" element={<Faqs />} />
            <Route path="/privacy&policies" element={<PrivacyPolicy />} />

             {/* Payment Page */}
            {/* <Route path="/payment" element={<PaymentPage />} /> */}
            <Route path="/payment" element={<PaymentPage />} />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
