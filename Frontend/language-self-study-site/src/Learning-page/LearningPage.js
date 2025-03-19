// components/LearningPage.js
import React from "react";
import Lessons from "./Lessons";
import Ranking from "./Ranking";
import FlashcardSection from "./FlashcardSection";
import Footer from "../common/Footer";

import "./styles/LearningPage.css";

const LearningPage = () => {
  return (
    <main className="learning-page">
      <div className="container">
        <h1 className="page-title">Nauka Języka</h1>

        <Lessons />
        <Ranking />
        <FlashcardSection />
        <Footer />
      </div>
    </main>
  );
};

export default LearningPage;
