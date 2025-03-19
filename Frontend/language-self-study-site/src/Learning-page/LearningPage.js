// components/LearningPage.js
import React from "react";
import Lessons from "./Lessons";
import Ranking from "./Ranking";
import FlashcardSection from "./FlashcardSection";
import Footer from "../common/Footer";
import Header from "../common/Header";

import "./styles/LearningPage.css";

const LearningPage = () => {
  return (
    <>
      <Header />
      <main className="learning-page">
        <div className="container">
          <h1 className="page-title">Nauka Języka</h1>
          <Lessons />
          <Ranking />
          <FlashcardSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LearningPage;
