import React from "react";
import LessonCard from "./LessonCard";
import lessons from "./data/lessons-data";

import "./styles/Lessons.css";

const Lessons = () => {
  return (
    <section className="lessons-section" id="lessons">
      <div className="section-header">
        <h2 className="section-title">Lekcje Tematyczne</h2>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson, index) => (
          <LessonCard key={index} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default Lessons;
