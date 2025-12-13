// PrizesRewards.jsx
import React from "react";
import { GiTrophy } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

function PrizeCard({ Icon, title, amount, note, iconColor, bgColor }) {
  return (
    <article
      className={`rounded-2xl p-8 text-center border shadow-sm`}
      style={{
        background: bgColor.bg,
        borderColor: bgColor.border,
      }}
      aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
    >
      <div className="mb-6">
        <div
          className="mx-auto h-14 w-14 rounded-full flex items-center justify-center"
          style={{ background: "transparent" }}
        >
          <Icon className="text-4xl" style={{ color: iconColor }} />
        </div>
      </div>

      <h3 id={title.replace(/\s+/g, "-").toLowerCase()} className="text-xl font-semibold text-slate-800 mb-3">
        {title}
      </h3>

      <div className="text-3xl font-extrabold" style={{ color: iconColor }}>
        {amount}
      </div>

      <p className="text-slate-500 mt-3">{note}</p>
    </article>
  );
}

function PrizesRewards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-slate-800">Prizes &amp; Rewards</h2>
        <p className="text-slate-500 mt-2 mb-10">What awaits our champions</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PrizeCard
            Icon={GiTrophy}
            title="1st Place"
            amount="₹50,000"
            note="Cash Prize + Trophy"
            iconColor="#B45309" // amber/dark-gold
            bgColor={{ bg: "linear-gradient(180deg,#fff8dc,#fff7e0)", border: "#F6E6AD" }}
          />

          <PrizeCard
            Icon={FaMedal}
            title="2nd Place"
            amount="₹30,000"
            note="Cash Prize + Medal"
            iconColor="#374151" // slate/charcoal
            bgColor={{ bg: "linear-gradient(180deg,#f8fafc,#f3f6f9)", border: "#E9EEF3" }}
          />

          <PrizeCard
            Icon={AiOutlineStar}
            title="3rd Place"
            amount="₹10,000"
            note="Cash Prize + Medal"
            iconColor="#ea580c" // orange
            bgColor={{ bg: "linear-gradient(180deg,#fff6ef,#fff2e8)", border: "#F6E6D8" }}
          />
        </div>

        {/* CTA pill */}
        <div className="mt-10">
          <div
            className="inline-block bg-teal-400 hover:bg-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-md transition"
            aria-label="All finishers receive a medal and certificate"
          >
            All finishers receive a medal and certificate
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrizesRewards;
