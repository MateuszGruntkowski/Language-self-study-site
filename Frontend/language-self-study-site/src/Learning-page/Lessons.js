import React, { useEffect, useState } from "react";
import LessonCard from "./LessonCard";
import { getLessonsData } from "./data/lessons-data";

import "./styles/Lessons.css";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessons = await getLessonsData();
        setLessons(lessons);
      } catch (err) {
        console.error("Błąd:", err);
      }
    };

    fetchLessons();
  }, []);

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
