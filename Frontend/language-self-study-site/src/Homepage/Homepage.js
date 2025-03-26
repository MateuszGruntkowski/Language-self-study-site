import React from "react";
import Header from "../common/Header";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "../common/Footer";

import "./styles/General.css";

const Homepage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Homepage;
