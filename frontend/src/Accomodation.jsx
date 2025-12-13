// src/Accomodation.jsx
import React, { useState } from "react";

const roomTypes = ["Single", "Double", "Twin Sharing", "Dormitory"];
const budgets = ["₹1000–₹1500", "₹1500–₹2500", "₹2500–₹4000", "₹4000+"];

function Accomodation() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    budget: "",
    pickup: false,
    notes: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API call later
    console.log("Accommodation request submitted:", form);
    alert("Accommodation request submitted (demo only).");
  };

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          1,
          Math.round(
            (new Date(form.checkOut) - new Date(form.checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const basePerNight = 1500;
  const estimatedTotal = basePerNight * nights * (Number(form.guests) || 1);

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <section className="max-w-6xl mx-auto px-4 lg:px-6 pt-10 mt-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700">
            Accommodation Assistance
          </h1>
          <p className="mt-3 text-slate-500 text-sm md:text-base">
            Request official accommodation near the race venue for a
            comfortable stay.
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr,1.2fr] gap-6 lg:gap-8 items-start">
          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8 space-y-6"
          >
            <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4 text-sm text-slate-700">
              <p className="font-semibold text-teal-800 mb-1">
                Staying with Marathon Run Partner Hotels
              </p>
              <p>
                Limited rooms are available at partner hotels close to the
                starting line. Fill in the details below and our team will share
                confirmation and payment link over email / WhatsApp.
              </p>
            </div>

            {/* Dates */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                Stay Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={(e) => handleChange("checkIn", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={(e) => handleChange("checkOut", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-3 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={form.guests}
                    onChange={(e) => handleChange("guests", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Room Type Preference *
                  </label>
                  <select
                    value={form.roomType}
                    onChange={(e) => handleChange("roomType", e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Budget / pickup */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Budget Per Night (per room)
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select budget range</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.pickup}
                    onChange={(e) =>
                      handleChange("pickup", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  I need airport / railway station pickup
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Special Requirements
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Room sharing preferences, dietary needs, accessibility requirements, etc."
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-teal-600 to-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/30 hover:from-teal-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Submit Accommodation Request
              </button>
              <p className="mt-2 text-xs text-slate-500">
                This is a request form. Final confirmation, hotel details and
                payment link will be shared by the organizing team.
              </p>
            </div>
          </form>

          {/* Summary card */}
          {/* <aside className="bg-linear-to-br from-cyan-50 to-white rounded-3xl border border-cyan-100 shadow-sm p-5 sm:p-6 md:p-8 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Stay Summary (Estimate)
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                This is an approximate cost based on default partner hotel
                pricing.
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Nights:</span>
                <span className="font-semibold text-slate-900">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Guests:</span>
                <span className="font-semibold text-slate-900">
                  {form.guests || 1}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Base rate (approx):</span>
                <span className="font-semibold text-slate-900">
                  ₹{basePerNight.toLocaleString()}/night
                </span>
              </div>
            </div>

            <div className="border-t border-cyan-100 pt-4">
              <p className="text-sm font-semibold text-slate-700 mb-1">
                Estimated total:
              </p>
              <p className="text-2xl font-extrabold text-teal-700">
                ₹{estimatedTotal.toLocaleString()}
              </p>
            </div>

            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Taxes and service charges may be extra.</li>
              <li>• Exact amount will depend on final hotel allocation.</li>
              <li>• Rooms are allocated on first-come, first-served basis.</li>
            </ul>
          </aside> */}
        </div>
      </section>
    </main>
  );
}

export default Accomodation;
