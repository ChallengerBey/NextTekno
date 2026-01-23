import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import ThemeTest from "../Common/ThemeTest";

const Home = () => {
  return (
    <main>
      <Hero />
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 py-8">
        <ThemeTest />
      </div>
      <Categories />
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
