// src/Home.jsx
import React from "react";
import HeroSection from "./Hero";
import EventCountdown from "./EventCountdown";
import EventInformation from "./EventInformation";
import RaceCategories from "./RaceCategories";
import PrizesRewards from "./PrizesRewards";
import Sponsors from "./Sponsors";
import CallToAction from "./CallToAction";
import EventOverview from "./EventOverview";
import ImageSlider from "./ImageSlider";
import Hero from "./Hero";

function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      {/* <HeroSection /> */}
      <EventCountdown />
      {/* <EventInformation />   */}
      {/* <RaceCategories />   */}
      <EventOverview />
      {/* <PrizesRewards /> */}
      <ImageSlider />
      <Sponsors />
      <CallToAction />
    </main>
  );
}

export default Home;
