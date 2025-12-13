// src/PrivacyPolicy.jsx
import React, { useState } from "react";

/**
 * PrivacyPolicy component
 * - Uses the exact text supplied by the user (no modifications).
 * - Accordion style (one open section at a time) to match the FAQ layout.
 */

const TITLE = "Privacy Policy";
const EFFECTIVE_DATE = ""; // put date if you want, left empty to strictly keep content unchanged

const SECTIONS = [
  {
    id: "data-collection",
    title: "1.1 Data Collection",
    content: [
      "● Name, Email, Phone",
      "● Address (City, State)",
      "● Gender, DOB",
      "● Emergency Contact",
      "● T-shirt Size",
      "● Category Registered",
      "● Payment Information (only via gateway; not stored on server)",
      "● Device/IP logs for security",
    ],
  },
  {
    id: "data-usage",
    title: "1.2 Data Usage",
    content: [
      "● For registration processing",
      "● For timing & results",
      "● For event communication",
      "● For emergency use",
      "● For certificates & photos",
    ],
  },
  {
    id: "data-protection",
    title: "1.3 Data Protection",
    content: [
      "● SSL encryption",
      "● No sale of personal data",
      "● Limited access only to authorized staff",
      "● Secure hosting & database protection",
    ],
  },
  {
    id: "third-party-tools",
    title: "1.4 Third Party Tools",
    content: [
      "● Razorpay/Paytm as payment gateway",
      "● Photo partner (photo search via bib)",
      "● Timing partner (chip timing integration)",
    ],
  },
  {
    id: "user-rights",
    title: "1.5 User Rights",
    content: [
      "● User can request data update",
      "● Correction for errors",
      "● Request removal after event completion",
    ],
  },
  {
    id: "cookies",
    title: "1.6 Cookies",
    content: ["Use for login, session, analytics."],
  },
];

export default function PrivacyPolicy() {
  // default: open first section (same as FAQ pattern). Set null for all collapsed by default.
  const [openId, setOpenId] = useState(SECTIONS[0]?.id ?? null);

  function toggle(id) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <main className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">{TITLE}</h1>
          {EFFECTIVE_DATE ? (
            <p className="text-sm text-slate-500 mt-2">
              Effective date: <span className="font-medium text-slate-700">{EFFECTIVE_DATE}</span>
            </p>
          ) : null}
        </header>

        <section className="space-y-6">
          {SECTIONS.map((s, idx) => {
            const isOpen = openId === s.id;
            return (
              <article
                key={s.id}
                className="border rounded-lg bg-white shadow-sm overflow-hidden"
                aria-labelledby={`${s.id}-heading`}
              >
                <button
                  id={`${s.id}-heading`}
                  type="button"
                  onClick={() => toggle(s.id)}
                  className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50"
                  aria-expanded={isOpen}
                  aria-controls={`${s.id}-panel`}
                >
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 font-medium">{`${idx + 1}.`}</span>
                      <h3 className="text-slate-800 text-lg font-medium">{s.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span
                      className="w-8 h-8 flex items-center justify-center rounded-full border bg-white text-slate-700"
                      aria-hidden
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                  </div>
                </button>

                <div
                  id={`${s.id}-panel`}
                  className={`px-6 pb-6 transition-all ${isOpen ? "pt-0" : "hidden"}`}
                  aria-hidden={!isOpen}
                >
                  <div className="mt-2 text-slate-600 leading-relaxed">
                    {s.content.map((line, i) => (
                      <p key={i} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <div className="mt-10 text-center text-sm text-slate-500">
          <p>
            For data requests or questions, contact the event organisers via the site contact options.
          </p>
        </div>
      </div>
    </main>
  );
}
