import React from "react";
import "./styles/General.css";
import Header from "./Header";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Features from "./Features";
import Testimonials from "./Testimonials";

const Homepage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <Testimonials />
    </>
  );
};

export default Homepage;
