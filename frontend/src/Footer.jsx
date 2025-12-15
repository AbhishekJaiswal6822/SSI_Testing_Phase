// src/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* MAIN GRID: 1 col mobile, 4 cols desktop */}
        <div className="grid grid-cols-1  md:grid-cols-5 md:grid-row-5 gap-10">

          {/* 1 — About */}
          <div>
            <h1 className="text-white text-lg font-semibold mb-3">Sprints Saga India</h1>
            <p className="text-slate-400 leading-relaxed">
              The premier marathon event bringing together runners from around the world.
            </p>
          </div>

          {/* 2 — Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/register" className="hover:text-white text-slate-300 hover:underline">Register</Link></li>
              <li><Link to="/results" className="hover:text-white text-slate-300 hover:underline">Results</Link></li>
              <li><Link to="/accommodation" className="hover:text-white text-slate-300 hover:underline">Accommodation</Link></li>
            </ul>
          </div>

          {/* 3 — Contact Us - REFACTORED */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">Contact Us</h4>

            <p className="text-sm text-slate-400 mb-4">
              (For any queries, support requests, or partnership opportunities, feel free to reach us through the details below.)
            </p>

            {/* REPLACED FLEX CONTAINER WITH SIMPLE DIVS/SPACING */}
            <div className="space-y-4">
              
              {/* Email Us */}
              <div className="min-w-0">
                <h5 className="text-white font-medium mb-1">Email Us</h5>
                <p className="text-slate-300 text-sm wrap-break-word whitespace-normal">info.desk@sprintssagaindia.com</p>
                <h1  className="text-white font-medium mb-1">Bulk Registration</h1>
                <p className="text-slate-300 text-sm wrap-break-word whitespace-normal">registration@sprintssagaindia.com</p>
              </div>

              {/* Social */}
              <div className="min-w-0">
                <h5 className="text-white font-medium mb-1">Social Media</h5>
                <p className="text-slate-300 text-sm wrap-break-word whitespace-normal">Instagram: @sprintssagaindia</p>
                <p className="text-slate-300 text-sm wrap-break-word whitespace-normal">Facebook: Sprints Saga India</p>
                {/* <a href="www.google.com">Instagram: @sprintssagaindia</a>
                <br />
                <a href="www.google.com">Facebook: Sprints Saga India</a> */}
              </div>

              {/* Phone */}
              <div className="shrink-0">
                <h5 className="text-white font-medium mb-1">Contact Number</h5>
                <p className="text-slate-300 text-sm">Mobile Number: +91 8850943813</p>
                <p className="text-slate-300 text-sm">Mobile Number: +91 9967707306</p>
                <p className="text-slate-300 text-sm">WhatsApp: +91 9987190415</p>
                
              </div>

            </div>
          </div>

          {/* 4 — FAQs */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">FAQs</h4>
            <p className="text-slate-400 text-sm">
              Need answers? Visit our FAQs for detailed information about registration, race rules, refunds, and more.
            </p>
            <Link to="/faqs" className="text-teal-400 hover:underline block mt-2">View FAQs</Link>
          </div>

          {/* 4 — Policies */}

          <div>
            <h4 className="text-white text-lg font-semibold mb-3">Privacy & Policies</h4>
            <p className="text-slate-400 text-sm">
              Your trust matters. Read our Privacy Policy to understand how your information is collected, used, and safeguarded.
            </p>
            <Link to="/privacy&policies" className="text-teal-400 hover:underline block mt-2">Privacy & Policies</Link>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-10"></div>

        {/* Copyright */}
        <div className="mt-6 text-center text-slate-400">
          © {new Date().getFullYear()} Sprints Saga India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;