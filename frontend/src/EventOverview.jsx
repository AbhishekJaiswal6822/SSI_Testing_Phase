import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LuCalendarDays,
  LuMapPin,
  LuUsers,
} from "react-icons/lu";
import {
  AiOutlineHeart,
} from "react-icons/ai";
import { RiStarLine } from "react-icons/ri";
import { GiTrophy } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";

const categories = [
  { id: 1, Icon: AiOutlineHeart, title: "5K Fun Run" },
  { id: 2, Icon: RiStarLine, title: "10K Challenge" },
  { id: 3, Icon: GiTrophy, title: "Half Marathon" },
  { id: 4, Icon: FaMedal, title: "Full Marathon" },
];

export default function EventOverview() {
  const navigate = useNavigate();

  return (
    <section
      className="
        w-full
        h-[calc(100vh-4rem)]
        bg-white
        overflow-hidden
        flex
        items-center
      "
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-10">

        {/* ===== Event Info ===== */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-800">
            Event Information
          </h2>
          <p className="text-slate-500 mt-1">
            Everything you need to know about Marathon Run 2026
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuCalendarDays />}
            title="Date"
            value="April 12, 2026"
          />
          <InfoCard
            icon={<LuMapPin />}
            title="Location"
            value="Pune, Maharashtra"
          />
          <InfoCard
            icon={<LuUsers />}
            title="Expected Runners"
            value="1,500+"
          />
        </div>

        {/* ===== Race Categories ===== */}
        <div className="text-center pt-2">
          <h2 className="text-3xl font-extrabold text-slate-800">
            Race Categories
          </h2>
          <p className="text-slate-500 mt-1">
            Choose your challenge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ id, Icon, title }) => (
            <div
              key={id}
              className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-6
                text-center
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Icon className="text-xl text-teal-600" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {title}
              </h3>

              <button
                onClick={() => navigate("/register")}
                className="
                  px-5 py-2
                  rounded-full
                  border
                  border-slate-300
                  text-slate-700
                  hover:bg-slate-100
                  transition
                "
              >
                Register
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------- Small reusable card ---------- */
function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
      <div className="text-3xl text-teal-600 mb-2 flex justify-center">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
      <p className="text-lg font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}
