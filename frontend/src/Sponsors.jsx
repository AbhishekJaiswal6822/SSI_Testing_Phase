import React from "react";

const sponsors = [
  { id: 1, icon: "🏃‍♂️", name: "Nike" },
  { id: 2, icon: "👟", name: "Adidas" },
  { id: 3, icon: "🥤", name: "Gatorade" },
  { id: 4, icon: "🍫", name: "PowerBar" },
];

function Sponsors() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-slate-800">
          Our Partnerships
        </h2>
        <p className="text-slate-500 mt-2 mb-10">
          Powered by industry leaders
        </p>

        {/* Sponsor List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
          {sponsors.map(({ id, icon, name }) => (
            <div
              key={id}
              className="w-32 h-32 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center hover:shadow-md transition"
            >
              <span className="text-4xl mb-2">{icon}</span>
              <p className="text-slate-700 font-medium">{name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Sponsors;
