// src/AdminAccommodation.jsx
import React, { useState } from "react";
import { FiSearch, FiFilter, FiDownload, FiMapPin } from "react-icons/fi";

const requests = [
  {
    id: "ACC001",
    name: "John Doe",
    bib: "A001",
    roomType: "Double",
    guests: 2,
    checkIn: "2024-01-14",
    checkOut: "2024-01-16",
    hotel: "City Marathon Inn",
    status: "Confirmed",
  },
  {
    id: "ACC002",
    name: "Jane Smith",
    bib: "B002",
    roomType: "Single",
    guests: 1,
    checkIn: "2024-01-15",
    checkOut: "2024-01-16",
    hotel: "Start Line Residency",
    status: "Pending",
  },
  {
    id: "ACC003",
    name: "Mike Johnson",
    bib: "C003",
    roomType: "Twin Sharing",
    guests: 2,
    checkIn: "2024-01-14",
    checkOut: "2024-01-17",
    hotel: "City Marathon Inn",
    status: "Cancelled",
  },
  {
    id: "ACC004",
    name: "Sarah Wilson",
    bib: "D004",
    roomType: "Dormitory",
    guests: 1,
    checkIn: "2024-01-15",
    checkOut: "2024-01-16",
    hotel: "Runner’s Hostel",
    status: "Confirmed",
  },
];

const stats = [
  { label: "Total Requests", value: 14 },
  { label: "Confirmed", value: 8 },
  { label: "Pending", value: 4 },
  { label: "Cancelled", value: 2 },
  { label: "Rooms Allocated", value: 11 },
];

function AdminAccommodation() {
  const [statusFilter, setStatusFilter] = useState("All");

  const renderStatusBadge = (status) => {
    let color = "bg-teal-600";
    if (status === "Pending") color = "bg-amber-500";
    if (status === "Cancelled") color = "bg-rose-500";

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${color}`}
      >
        {status}
      </span>
    );
  };

  const filteredRequests =
    statusFilter === "All"
      ? requests
      : requests.filter((r) => r.status === statusFilter);

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-8 sm:pt-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700">
              Accommodation Management
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Track and manage accommodation requests from participants.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white
                       px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 w-full sm:w-auto"
          >
            <FiDownload />
            Export Requests
          </button>
        </div>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {stats.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm px-3 py-3 sm:px-4 sm:py-4"
            >
              <p className="text-[11px] sm:text-xs text-slate-500 mb-1">
                {card.label}
              </p>
              <p className="text-sm sm:text-lg font-semibold text-slate-900">
                {card.value}
              </p>
            </div>
          ))}
        </section>

        {/* Requests table */}
        <section className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
              <FiMapPin />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Accommodation Requests
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                View and update room allocation for registered runners
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, bib number or hotel..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300
                           text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300
                           bg-white px-3 py-2 text-sm text-slate-700 flex-1 md:flex-none"
              >
                <FiFilter />
                Status
                <span className="text-xs">▾</span>
              </button>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 flex-1 md:flex-none"
              >
                <option>All</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-3 pr-4 whitespace-nowrap">Req ID</th>
                  <th className="py-3 pr-4">Participant</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Bib</th>
                  <th className="py-3 pr-4">Room Type</th>
                  <th className="py-3 pr-4">Guests</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Check-in</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Check-out</th>
                  <th className="py-3 pr-4">Hotel</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-slate-100 last:border-none"
                  >
                    <td className="py-3 pr-4 text-teal-700 font-semibold whitespace-nowrap">
                      {r.id}
                    </td>
                    <td className="py-3 pr-4">{r.name}</td>
                    <td className="py-3 pr-4">{r.bib}</td>
                    <td className="py-3 pr-4">{r.roomType}</td>
                    <td className="py-3 pr-4">{r.guests}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">{r.checkIn}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">{r.checkOut}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">{r.hotel}</td>
                    <td className="py-3 pr-4">{renderStatusBadge(r.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminAccommodation;
