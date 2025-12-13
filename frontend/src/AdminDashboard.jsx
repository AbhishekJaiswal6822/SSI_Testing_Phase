// src/AdminDashboard.jsx
import React, { useState } from "react";
import { FiUsers, FiDownload, FiSearch, FiFilter, FiTag } from "react-icons/fi";

const usersData = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    age: 28,
    gender: "Male",
    date: "2024-01-15",
    status: "Active",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    age: 25,
    gender: "Female",
    date: "2024-01-16",
    status: "Active",
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567892",
    age: 32,
    gender: "Male",
    date: "2024-01-17",
    status: "Inactive",
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1234567893",
    age: 29,
    gender: "Female",
    date: "2024-01-18",
    status: "Active",
  },
];

const registrationsData = [
  {
    bib: "A001",
    name: "John Doe",
    category: "42K",
    paymentStatus: "Completed",
    amount: "₹2500",
    date: "2024-01-15",
    accommodation: "Yes",
  },
  {
    bib: "B002",
    name: "Jane Smith",
    category: "22K",
    paymentStatus: "Pending",
    amount: "₹1800",
    date: "2024-01-16",
    accommodation: "No",
  },
  {
    bib: "C003",
    name: "Mike Johnson",
    category: "10K",
    paymentStatus: "Completed",
    amount: "₹1200",
    date: "2024-01-17",
    accommodation: "Yes",
  },
  {
    bib: "D004",
    name: "Sarah Wilson",
    category: "5K",
    paymentStatus: "Failed",
    amount: "₹800",
    date: "2024-01-18",
    accommodation: "No",
  },
];

const statsCards = [
  { label: "Total", value: 7 },
  { label: "Individual", value: 4 },
  { label: "Group", value: 3 },
  { label: "Completed", value: 4 },
  { label: "Pending", value: 2 },
  { label: "Revenue", value: "₹41700" },
];

const couponsData = [
  {
    code: "EARLY2024",
    discount: "20%",
    type: "Percentage",
    usage: "45/100",
    progress: 45,
    expiry: "2024-03-01",
    status: "Active",
  },
  {
    code: "STUDENT50",
    discount: "50%",
    type: "Percentage",
    usage: "32/50",
    progress: 64,
    expiry: "2024-02-28",
    status: "Active",
  },
  {
    code: "NEWRUNNER",
    discount: "15%",
    type: "Percentage",
    usage: "156/200",
    progress: 78,
    expiry: "2024-04-01",
    status: "Active",
  },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  const tabClasses = (tab) =>
    `flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition
     ${
       activeTab === tab
         ? "bg-white text-slate-900 shadow-sm"
         : "text-slate-500 hover:text-slate-800"
     }`;

  const renderStatusBadge = (status) => {
    let color = "bg-teal-600";
    if (status === "Inactive") color = "bg-slate-400";
    if (status === "Pending") color = "bg-amber-500";
    if (status === "Failed") color = "bg-rose-500";

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${color}`}
      >
        {status}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-8 sm:pt-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Manage your marathon event with powerful insights
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white
                       px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 w-full sm:w-auto"
          >
            <FiDownload />
            Export Data
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 sm:mt-8 w-full max-w-xl">
          <div className="bg-slate-50 rounded-full p-1 border border-slate-200 flex flex-wrap gap-2">
            <button
              className={tabClasses("users")}
              onClick={() => setActiveTab("users")}
            >
              <FiUsers />
              <span>Users</span>
            </button>
            <button
              className={tabClasses("registrations")}
              onClick={() => setActiveTab("registrations")}
            >
              <FiUsers className="scale-90" />
              <span>Registrations</span>
            </button>
            <button
              className={tabClasses("coupons")}
              onClick={() => setActiveTab("coupons")}
            >
              <FiTag />
              <span>Coupons</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8">
          {/* USERS TAB */}
          {activeTab === "users" && (
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                  <FiUsers />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                    User Management
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    View and manage registered users
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300
                               text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-between gap-2 rounded-xl border
                             border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 w-full md:w-auto"
                >
                  All Status
                  <span className="text-xs">▾</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-slate-200">
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Phone</th>
                      <th className="py-3 pr-4">Age</th>
                      <th className="py-3 pr-4">Gender</th>
                      <th className="py-3 pr-4 whitespace-nowrap">
                        Registration Date
                      </th>
                      <th className="py-3 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((user) => (
                      <tr
                        key={user.email}
                        className="border-b border-slate-100 last:border-none"
                      >
                        <td className="py-3 pr-4 whitespace-nowrap font-medium text-teal-700">
                          {user.name}
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap text-slate-700">
                          {user.email}
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap text-slate-700">
                          {user.phone}
                        </td>
                        <td className="py-3 pr-4">{user.age}</td>
                        <td className="py-3 pr-4">{user.gender}</td>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {user.date}
                        </td>
                        <td className="py-3 pr-4">{renderStatusBadge(user.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* REGISTRATIONS TAB */}
          {activeTab === "registrations" && (
            <>
              {/* Stat cards */}
              <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {statsCards.map((card) => (
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

              {/* Event registrations */}
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                    <FiUsers />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                      Event Registrations
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      View and manage participant registrations
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search registrations..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300
                                 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300
                               bg-white px-3 py-2 text-sm text-slate-700 w-full md:w-auto"
                  >
                    <FiFilter />
                    Individual
                    <span className="text-xs">▾</span>
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300
                               bg-white px-3 py-2 text-sm text-slate-700 w-full md:w-auto"
                  >
                    <FiFilter />
                    All Categories
                    <span className="text-xs">▾</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 border-b border-slate-200">
                        <th className="py-3 pr-4 whitespace-nowrap">Bib Number</th>
                        <th className="py-3 pr-4">Name</th>
                        <th className="py-3 pr-4">Category</th>
                        <th className="py-3 pr-4 whitespace-nowrap">
                          Payment Status
                        </th>
                        <th className="py-3 pr-4">Amount</th>
                        <th className="py-3 pr-4 whitespace-nowrap">
                          Registration Date
                        </th>
                        <th className="py-3 pr-4">Accommodation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationsData.map((r) => (
                        <tr
                          key={r.bib}
                          className="border-b border-slate-100 last:border-none"
                        >
                          <td className="py-3 pr-4 text-teal-700 font-semibold">
                            {r.bib}
                          </td>
                          <td className="py-3 pr-4">{r.name}</td>
                          <td className="py-3 pr-4">
                            <span className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-[11px] sm:text-xs">
                              {r.category}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            {renderStatusBadge(r.paymentStatus)}
                          </td>
                          <td className="py-3 pr-4">{r.amount}</td>
                          <td className="py-3 pr-4 whitespace-nowrap">{r.date}</td>
                          <td className="py-3 pr-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold ${
                                r.accommodation === "Yes"
                                  ? "bg-teal-600 text-white"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {r.accommodation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* COUPONS TAB */}
          {activeTab === "coupons" && (
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                    <FiTag />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                      Coupon Management
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Create and manage discount coupons
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2
                             text-sm font-semibold text-white hover:bg-teal-800 w-full md:w-auto"
                >
                  + Create Coupon
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-slate-200">
                      <th className="py-3 pr-4">Code</th>
                      <th className="py-3 pr-4">Discount</th>
                      <th className="py-3 pr-4">Type</th>
                      <th className="py-3 pr-4">Usage</th>
                      <th className="py-3 pr-4 whitespace-nowrap">Expiry Date</th>
                      <th className="py-3 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {couponsData.map((c) => (
                      <tr
                        key={c.code}
                        className="border-b border-slate-100 last:border-none"
                      >
                        <td className="py-3 pr-4 text-teal-700 font-semibold">
                          {c.code}
                        </td>
                        <td className="py-3 pr-4">{c.discount}</td>
                        <td className="py-3 pr-4">{c.type}</td>
                        <td className="py-3 pr-4">
                          <div className="space-y-1">
                            <p>{c.usage}</p>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-teal-600"
                                style={{ width: `${c.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {c.expiry}
                        </td>
                        <td className="py-3 pr-4">
                          {renderStatusBadge(c.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
