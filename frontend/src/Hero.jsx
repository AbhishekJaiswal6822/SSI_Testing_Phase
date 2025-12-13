import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Desktop images
import img1Desktop from "./assets/lokraja-marathon-2026-desktop.jpeg";
import img2Desktop from "./assets/registration-website-desktop.jpeg";
import img3Desktop from "./assets/early-bird-desktop.jpeg";

// Mobile images
import img1Mobile from "./assets/lokraja-marathon-2026-mobile.jpeg";
import img2Mobile from "./assets/registration-website-mobile.jpeg";
import img3Mobile from "./assets/early-bird-mobile.jpeg";

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { desktop: img1Desktop, mobile: img1Mobile }, // CLICKABLE
    { desktop: img2Desktop, mobile: img2Mobile }, // CLICKABLE
    { desktop: img3Desktop, mobile: img3Mobile }, // NOT clickable
  ];

  const handleScroll = () => {
    const el = containerRef.current;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  };

  return (
    <section className="w-full h-[calc(100dvh-3rem)] lg:h-screen overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="
          flex
          w-full
          h-full
          overflow-x-auto
          snap-x
          snap-mandatory
          scroll-smooth
          no-scrollbar
        "
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-w-full h-full snap-center shrink-0"
          >
            {/* Image */}
            <picture className="block w-full h-full">
              <source media="(max-width:768px)" srcSet={slide.mobile} />
              <img
                src={slide.desktop}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover block"
                draggable={false}
              />
            </picture>

            {/* IMAGE 1 — REGISTER (Lokraja Marathon) */}
            {index === 0 && activeIndex === 0 && (
              <button
                onClick={() => navigate("/register")}
                aria-label="Register"
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  bottom-[1%]

                  w-[300px] h-[100px]
                  sm:w-[340px] sm:h-[120px]
                  md:w-[380px] md:h-[130px]
                  lg:w-[420px] lg:h-[140px]

                  bg-transparent
                  cursor-pointer
                  z-50
                  touch-manipulation
                "
              />
            )}

            {/* IMAGE 2 — REGISTER NOW (Blue slide) */}
            {index === 1 && activeIndex === 1 && (
              <button
                onClick={() => navigate("/register")}
                aria-label="Register Now"
                className="
                  absolute
                  right-[5%]
                  bottom-[12%]

                  w-[260px] h-[90px]
                  sm:w-[320px] sm:h-[110px]
                  md:w-[380px] md:h-[130px]
                  lg:w-[420px] lg:h-[140px]

                  bg-transparent
                  cursor-pointer
                  z-50
                  touch-manipulation
                "
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
