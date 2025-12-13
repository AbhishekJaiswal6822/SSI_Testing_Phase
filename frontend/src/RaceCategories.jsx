import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { RiStarLine } from "react-icons/ri";
import { GiTrophy } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";
import { useNavigate } from "react-router-dom";   // ⭐ add this

const categories = [
  { id: 1, Icon: AiOutlineHeart, title: "5K Fun Run" },
  { id: 2, Icon: RiStarLine, title: "10K Challenge"},
  { id: 3, Icon: GiTrophy, title: "Half Marathon" },
  { id: 4, Icon: FaMedal, title: "Full Marathon"  },
];

function RaceCategories() {
  const navigate = useNavigate();   // ⭐ navigation object

  const handleRegister = (title) => {
    // Optional: store selected category if needed
    // localStorage.setItem("selectedCategory", title);

    navigate("/register");    // ⭐ redirect to register page
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-slate-800">Race Categories</h2>
        <p className="text-slate-500 mt-2 mb-10">Choose your challenge</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(({ id, Icon, title, price }) => (
            <article
              key={id}
              className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
            >
              <div className="mb-4 flex items-center justify-center">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{ background: getIconBg(id) }}
                >
                  <Icon className="text-2xl" style={{ color: getIconColor(id) }} />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">{title}</h3>
              <div className="text-teal-700 text-2xl font-extrabold mb-4">{price}</div>

              {/* ⭐ Updated button */}
              <button
                type="button"
                className="inline-block px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                onClick={() => handleRegister(title)}
              >
                Register
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Icon helpers */
function getIconColor(id) {
  switch (id) {
    case 1: return "#059669";
    case 2: return "#2563EB";
    case 3: return "#F97316";
    case 4: return "#8B5CF6";
    default: return "#0C6E84";
  }
}
function getIconBg(id) {
  switch (id) {
    case 1: return "rgba(5,150,105,0.08)";
    case 2: return "rgba(37,99,235,0.08)";
    case 3: return "rgba(249,115,22,0.06)";
    case 4: return "rgba(139,92,246,0.06)";
    default: return "rgba(12,110,132,0.06)";
  }
}

export default RaceCategories;
