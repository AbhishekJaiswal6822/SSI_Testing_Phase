import React from "react";
import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();   // ⭐ allows navigation

  return (
    <section
      className="
        w-full 
        py-24 
        text-center 
        text-white 
        bg-linear-to-r 
        from-teal-800 
        via-teal-600 
        to-cyan-500
      "
    >
      <div className="max-w-3xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Ready to Take the Challenge?
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl leading-relaxed mb-10">
          Don't miss out on the most exciting marathon event of 2026.
          Register now <br /> and secure your spot!
        </p>

        {/* CTA Button */}
        <button
          className="
            bg-white 
            text-teal-700 
            font-semibold 
            px-8 
            py-3 
            rounded-full 
            shadow-md 
            hover:bg-gray-100 
            transition
            cursor-pointer
          "
          onClick={() => navigate("/register")}   // ⭐ go to Register
        >
          Register Now – Early Bird Pricing
        </button>

      </div>
    </section>
  );
}

export default CallToAction;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// function CallToAction() {
//   const navigate = useNavigate();

//   return (
//     <section
//       className="
//         w-full 
//         py-24 
//         text-center 
//         text-white 
//         relative 
//         overflow-hidden
//       "
//       style={{
//         background: `
//           radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 60%),
//           radial-gradient(circle at 80% 20%, rgba(255,158,90,0.35), transparent 60%),
//           radial-gradient(circle at 50% 80%, rgba(255,220,180,0.25), transparent 70%),
//           linear-gradient(135deg, #C52426 0%, #E53935 40%, #F36E2A 100%)
//         `
//       }}
//     >
//       <div className="max-w-3xl mx-auto px-4">

//         {/* Title */}
//         <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
//           Ready to Take the Challenge?
//         </h2>

//         {/* Subtitle */}
//         <p className="text-lg sm:text-xl leading-relaxed mb-10">
//           Don't miss out on the most exciting marathon event of 2024.
//           Register now <br /> and secure your spot!
//         </p>

//         {/* CTA Button */}
//         <button
//           className="
//             bg-white 
//             text-[#C52426]
//             font-semibold 
//             px-8 
//             py-3 
//             rounded-full 
//             shadow-md 
//             hover:bg-gray-100 
//             transition
//             cursor-pointer
//           "
//           onClick={() => navigate("/register")}
//         >
//           Register Now – Early Bird Pricing
//         </button>

//       </div>
//     </section>
//   );
// }

// export default CallToAction;
