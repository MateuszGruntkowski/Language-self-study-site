import React from "react";
import "./styles/General.css";
import Header from "./Header";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

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
