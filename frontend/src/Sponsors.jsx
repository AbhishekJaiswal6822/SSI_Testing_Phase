import React from "react";

import SportsRhinosLogo from "./assets/sponsor1.jpeg";

const sponsors = [
  // { id: 1, icon: "🏃‍♂️", name: "Nike" },
  // { id: 2, icon: "👟", name: "Adidas" },
  // { id: 3, icon: "🥤", name: "Gatorade" },
  // { id: 4, icon: "🍫", name: "PowerBar" },
  { id: 10, type: "image", src: SportsRhinosLogo, name: "Execute Partner" },
];

function Sponsors() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-black mb-10">
          Our Official Partner
        </h2>
      

        {/* Sponsor List Grid Container */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-40 h-40 bg-white border border-gray-200 rounded-xl shadow-lg 
                       flex flex-col items-center justify-center p-3 
                       hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
                {/* Conditional rendering for image or icon */}
                {sponsor.type === "image" ? (
                    <img
                        src={sponsor.src}
                        alt={sponsor.name}
                        // Use w-full and h-auto for responsiveness, object-contain ensures the logo fits
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <span className="text-5xl mb-2">{sponsor.icon}</span>
                )}
              <p className="text-slate-700 font-medium mt-2 text-sm text-center">{sponsor.name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Sponsors;