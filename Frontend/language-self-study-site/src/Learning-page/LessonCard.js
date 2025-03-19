// components/LessonCard.js
import React from "react";

const LessonCard = ({ lesson }) => {
  return (
    <div className="lesson-card">
      <div
        className="lesson-image"
        style={{ backgroundImage: `url(${lesson.imageUrl})` }}
      ></div>
      <div className="lesson-content">
        <h3 className="lesson-title">{lesson.title}</h3>
        <p className="lesson-description">{lesson.description}</p>
        <div className="lesson-meta">
          <span>{lesson.exercises} zadań</span>
          <span className={`lesson-level level-${lesson.level.toLowerCase()}`}>
            {lesson.level}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
