// src/Register.jsx
import React, { useState } from "react";
import { RACE_PRICING } from "./constants/racePricing";
import { useNavigate } from "react-router-dom";



// const amount = RACE_PRICING[raceCategory];


// Race categories now include INR prices for calculation
const raceCategories = [
  { id: "5k", name: "5K Fun Run", description: "Perfect for beginners", price: 1200 },
  { id: "10k", name: "10K Challenge", description: "Step up your game", price: 1700 },
  { id: "half", name: "Half Marathon (22K)", description: "The classic distance", price: 2500 },
  { id: "35k", name: "35K Ultra", description: "Push your limits", price: 2700 },
  { id: "full", name: "Full Marathon (42K)", description: "The ultimate challenge", price: 3000 }
];

const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const racecategories = ["5k    ₹1200", "10k ₹ 1700", "22k  ₹2500", "35k  ₹2700", "42k  ₹3000"];
const statesInIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

function Register() {
  const defaultRace = raceCategories[1]; // 10K default

  const [registrationType, setRegistrationType] = useState("individual");
  const [selectedRace, setSelectedRace] = useState(defaultRace); // Used only for individual registration

  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      tshirtSize: "",
      address: "",
      // Store the chosen race ID for each member
      raceId: defaultRace.id,
    },
  ]);
  const navigate = useNavigate();


  // Helper function for a new blank member object with default race
  const newMemberObject = () => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    tshirtSize: "",
    address: "",
    raceId: defaultRace.id, // Set a default race for new members
  });

  // Add one blank member
  const handleAddMember = () => {
    setGroupMembers((prev) => [
      ...prev,
      newMemberObject(),
    ]);
  };

  // Remove member by index (fixed: can remove any member)
  const handleRemoveMember = (indexToRemove) => {
    setGroupMembers((prev) => {
      if (prev.length <= 1) return prev; // keep at least 1
      return prev.filter((_, i) => i !== indexToRemove);
    });
  };

  // Leader control to set total count (adds or removes as needed)
  const setMemberCount = (count) => {
    const n = Math.max(1, Math.min(200, Number(count || 0))); // clamp 1..200
    setGroupMembers((prev) => {
      const cur = prev.length;
      if (n === cur) return prev;
      if (n > cur) {
        // Use newMemberObject helper
        const add = Array.from({ length: n - cur }, () => newMemberObject());
        return [...prev, ...add];
      } else {
        return prev.slice(0, n);
      }
    });
  };

  const handleMemberChange = (index, field, value) => {
    setGroupMembers((prev) =>
      prev.map((member, i) => (i === index ? { ...member, [field]: value } : member))
    );
  };

  const memberCount = groupMembers.length;

  // --- START UPDATED CALCULATION LOGIC FOR DISCOUNT TIERS ---
  let totalAmount = 0;
  let raceSummary = [];
  let discountPercent = 0;
  let rawTotal = 0;
  let discountAmount = 0;

  if (registrationType === "individual") {
    totalAmount = selectedRace.price;
    raceSummary.push({ name: selectedRace.name, price: selectedRace.price });
    rawTotal = totalAmount;

  } else {
    // 1. Calculate raw total price (sum of all chosen races)
    const memberPrices = groupMembers.map(member => {
      const race = raceCategories.find(r => r.id === member.raceId);
      return race ? race.price : 0;
    });

    rawTotal = memberPrices.reduce((sum, price) => sum + price, 0);
    totalAmount = rawTotal;

    // 2. Determine Tiered Discount Percentage based on group size
    if (memberCount >= 25) {
      discountPercent = 20;
    } else if (memberCount >= 10) {
      discountPercent = 15;
    } else if (memberCount >= 5) {
      discountPercent = 10;
    }
    // If < 5 members, discountPercent remains 0 (no discount)

    // 3. Apply discount
    if (discountPercent > 0) {
      discountAmount = Math.round(rawTotal * (discountPercent / 100));
      totalAmount = rawTotal - discountAmount;
    }

    // 4. Prepare group race summary for display
    const raceCounts = groupMembers.reduce((acc, member) => {
      const race = raceCategories.find(r => r.id === member.raceId);
      if (race) {
        acc[race.name] = (acc[race.name] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert counts to readable summary
    raceSummary = Object.entries(raceCounts).map(([name, count]) => ({ name, count }));
  }
  // --- END UPDATED CALCULATION LOGIC ---

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (registrationType === "group") {
      console.log("Group:", groupName, "Members:", groupMembers);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700 tracking-tight">
            Register for Marathon Run 2024
          </h1>
          <p className="mt-3 text-slate-600">Choose your registration type and complete your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Registration Type */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Registration Type</h2>
            <p className="text-sm text-slate-500 mt-1">Choose between individual or group registration</p>

            <div className="mt-5 bg-slate-50 rounded-full p-1 flex text-sm font-medium border border-slate-100">
              <button
                type="button"
                onClick={() => setRegistrationType("individual")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full transition ${registrationType === "individual" ? "bg-white shadow-sm text-teal-700" : "text-slate-500"}`}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200" />
                <span className="cursor-pointer">Individual Registration</span>
              </button>

              <button
                type="button"
                onClick={() => setRegistrationType("group")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full transition ${registrationType === "group" ? "bg-white shadow-sm text-teal-700" : "text-slate-500"}`}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200" />
                <span className="cursor-pointer">Group Registration</span>
              </button>
            </div>

            {registrationType === "individual" ? (
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 flex items-start gap-3">
                <div className="mt-1">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">👤</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Individual Registration</h3>
                  <p className="text-sm text-slate-600 mt-1">Register yourself for the marathon</p>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 flex items-start gap-3">
                <div className="mt-1">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">👥</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Group Registration</h3>
                  <p className="text-sm text-slate-600 mt-1">Register multiple participants together. Discounts available for 5, 10, or 25+ members.</p>
                </div>
              </div>
            )}
          </div>

          {/* Choose Race Category (Only shown for Individual) */}
          {registrationType === "individual" && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
              <div className="flex items-center gap-2">
                <span className="text-teal-600 text-xl">🏆</span>
                <h2 className="text-xl font-semibold text-slate-900">Choose Your Race Category</h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">Select the distance that matches your fitness level and goals</p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {raceCategories.map((race) => {
                  const isSelected = selectedRace.id === race.id;
                  return (
                    <button
                      key={race.id}
                      type="button"
                      onClick={() => setSelectedRace(race)}
                      className={`cursor-pointer relative w-full text-left rounded-2xl border px-5 py-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${isSelected ? "border-teal-500 bg-cyan-50 shadow-sm" : "border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50"}`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{race.name}</p>
                          <p className="text-sm text-slate-500 mt-1">{race.description}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-cyan-500 text-white">₹{race.price}</span>
                      </div>

                      {isSelected && (
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-teal-700">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white text-[10px]">✓</span>
                          <span>Selected</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Group Registration Details */}
          {registrationType === "group" && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Group Registration Details</h2>
              <p className="text-sm text-slate-500 mt-1">Enter details for all group members. Tiered discounts apply for 5, 10, or 25+ members.</p>

              <div className="mt-6 grid md:grid-cols-[2fr,1fr,auto] gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Group Name *</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="e.g., Mumbai Runners Club"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of Members</label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMemberCount(memberCount - 1)}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700"
                      aria-label="Decrease members"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={memberCount}
                      onChange={(e) => setMemberCount(Number(e.target.value))}
                      className="w-20 text-center rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => setMemberCount(memberCount + 1)}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700"
                      aria-label="Increase members"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Group leader can set number of members. Minimum 1.</p>
                </div>

                <div className="flex md:justify-end">
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="inline-flex items-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
                  >
                    Add Member
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4 md:p-5">
                {groupMembers.map((member, index) => (
                  <div key={index} className="border border-slate-200 rounded-2xl bg-white p-4 md:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">Member {index + 1} - {raceCategories.find(r => r.id === member.raceId)?.name || 'Select Race'}</h3>

                      {/* Remove button for every member when > 1 */}
                      {groupMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(index)}
                          className="text-xs text-rose-600 hover:underline"
                          title={`Remove member ${index + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      {/* Race Category Selection for Group Member */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Race Category *</label>
                        <select
                          value={member.raceId}
                          onChange={(e) => handleMemberChange(index, "raceId", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        >
                          <option value="">Select race</option>
                          {raceCategories.map((race) => (
                            <option key={race.id} value={race.id}>
                              {race.name} (₹{race.price})
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Kept 3 columns for Name/Email as before */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          value={member.firstName}
                          onChange={(e) => handleMemberChange(index, "firstName", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={member.lastName}
                          onChange={(e) => handleMemberChange(index, "lastName", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          value={member.phone}
                          onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                        <select
                          value={member.gender}
                          onChange={(e) => handleMemberChange(index, "gender", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        >
                          <option value="">Select</option>
                          {genders.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">T-Shirt Size *</label>
                        <select
                          value={member.tshirtSize}
                          onChange={(e) => handleMemberChange(index, "tshirtSize", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        >
                          <option value="">Select size</option>
                          {tshirtSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Address field for Member 1 only */}
                    {index === 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
                        <textarea
                          rows={2}
                          value={member.address}
                          onChange={(e) => handleMemberChange(index, "address", e.target.value)}
                          placeholder="House/Flat No., Street, Area, City"
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        />
                        <label className="block text-sm font-medium text-slate-700 mb-1">Query Box *</label>
                        <textarea
                          rows={2}
                          value={member.address}
                          onChange={(e) => handleMemberChange(index, "address", e.target.value)}
                          placeholder="For any query write here will try to solve them."
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual: Personal Information (Unchanged) */}
          {registrationType === "individual" && (
            <>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
                <p className="text-sm text-slate-500 mt-1">Please provide your complete personal details as per government ID</p>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                    <input type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                    <input type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Parent / Emergency Name *</label>
                    <input type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Parent / Emergency Number *</label>
                    <input type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                    <input type="email" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                    <input type="tel" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
                    <input type="tel" placeholder="If different from phone" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
                    <input type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                    <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50">
                      <option value="">Select gender</option>
                      {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group *</label>
                    <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50">
                      <option value="">Select blood group</option>
                      {bloodGroups.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>

                  </div>

                  <div className="md:col-span-2 md:max-w-xs">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nationality *</label>
                    <input type="text" defaultValue="Indian" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-slate-900">Address Information</h2>
                <p className="text-sm text-slate-500 mt-1">Your current residential address</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Complete Address *</label>
                    <textarea rows={3} placeholder="House/Flat No., Street, Area" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                      <input type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
                      <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50">
                        <option value="">Select state</option>
                        {statesInIndia.map((state) => <option key={state} value={state}>{state}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Pincode *</label>
                      <input type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                      <input type="text" defaultValue="Indian" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Runner Information</h2>
                  <p className="text-sm text-slate-500 mt-1">Help us better understand your running profile</p>

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Previous Marathon Experience *</label>
                      <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50">
                        <option value="">Select experience level</option>
                        <option value="first">First time</option>
                        <option value="beginner">Beginner (1–2 races)</option>
                        <option value="intermediate">Intermediate (3–5 races)</option>
                        <option value="advanced">Advanced (5+ races)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expected Finish Time</label>
                      <input type="text" placeholder="e.g., 4:30:00" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dietary Restrictions</label>
                    <input type="text" placeholder="Vegetarian, Vegan, Allergies, etc." className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🎁</span>
                    <h2 className="text-lg font-semibold text-slate-900">Referral Code</h2>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Have a referral code? Enter it here to earn bonus points!</p>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Referral Code (Optional)</label>
                  <input type="text" placeholder="Enter referral code" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 bg-white" />
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-slate-900">Race Kit &amp; Additional Services</h2>
                <p className="text-sm text-slate-500 mt-1">Choose your preferences and additional services</p>

                <div className="mt-6 space-y-4">
                  <div className="md:max-w-xs">
                    <label className="block text-sm font-medium text-slate-700 mb-1">T-Shirt Size *</label>
                    <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50">
                      <option value="">Select t-shirt size</option>
                      {tshirtSizes.map((size) => <option key={size} value={size}>{size}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                      <span>I need accommodation assistance</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                      <span>I need transportation assistance</span>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Registration Summary & CTA (UPDATED with button fix) */}
          <div className="bg-linear-to-br from-cyan-50 to-white rounded-3xl shadow-sm border border-cyan-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Registration Summary</h2>

            <div className="mt-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Registration Type:</span>
                <span className="font-semibold text-slate-900 capitalize">{registrationType === "individual" ? "Individual" : "Group"}</span>
              </div>

              {registrationType === "individual" ? (
                // Individual Summary
                <div className="flex justify-between">
                  {/*                   <span className="text-slate-600">Race Category:</span>
                  <span className="font-semibold text-slate-900">{selectedRace.name}</span> */}

                  <div className="flex justify-between">
                    <span className="text-slate-600">Race Category:</span>
                    <span className="font-semibold text-slate-900">
                      {selectedRace.name}
                    </span>
                  </div>

                </div>
              ) : (
                // Group Summary (Multiple Races)
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Group Members:</span>
                    <span className="font-semibold text-slate-900">{memberCount}</span>
                  </div>
                  {/* Display race breakdown */}
                  {raceSummary.map((item, index) => (
                    <div key={index} className="flex justify-between pl-4 text-xs text-slate-500">
                      <span>- {item.name} registrations:</span>
                      <span className="font-semibold">{item.count}</span>
                    </div>
                  ))}

                  {/* Display Subtotal before discount */}
                  <div className="flex justify-between pt-2 border-t border-dashed border-slate-100">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-semibold text-slate-900">₹{rawTotal}</span>
                  </div>

                  {/* Display Discount Applied */}
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="font-semibold">Group Discount ({discountPercent}%):</span>
                      <span className="font-semibold">-₹{discountAmount}</span>
                    </div>
                  )}
                </>
              )}

              <div className="pt-3 mt-2 border-t border-cyan-100 flex justify-between items-center">
                <span className="text-slate-700 font-semibold">Total Amount:</span>
                <span className="text-xl font-extrabold text-teal-700">₹{totalAmount}</span>
              </div>
            </div>

            <div className="mt-5 text-sm text-slate-600">
              <p className="font-semibold mb-2">Registration fee includes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Race kit with participant bib</li>
                <li>Event t-shirt</li>
                <li>Finisher medal</li>
                <li>Refreshments during race</li>
                <li>Digital certificate</li>
              </ul>
            </div>

            <div className="mt-8 flex justify-center">
              {/* old button */}
              {/* <button
                type="submit"
                className="cursor-pointer inline-flex items-center justify-center rounded-full bg-linear-to-r from-teal-600 to-cyan-500 px-16 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-teal-500/30 hover:from-teal-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 whitespace-nowrap"
              >
                Proceed to Payment - ₹{totalAmount}
              </button> */}

              <button
                type="button"
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      amount: totalAmount,
                      registrationType,
                      raceCategory:
                        registrationType === "individual"
                          ? selectedRace.name
                          : "Group Registration",
                      groupName: registrationType === "group" ? groupName : null,
                      members: registrationType === "group" ? groupMembers : null,
                    },
                  })
                }
                className="cursor-pointer inline-flex items-center justify-center rounded-full bg-linear-to-r from-teal-600 to-cyan-500 px-16 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-teal-500/30 hover:from-teal-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 whitespace-nowrap"
              >
                Proceed to Payment - ₹{totalAmount}
              </button>


            </div>
          </div>

        </form>
      </section>
    </main>
  );
}

export default Register;


