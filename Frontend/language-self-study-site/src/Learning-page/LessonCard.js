// components/LessonCard.js
import React from "react";

const LessonCard = ({ lesson }) => {
  const imageUrl = `/images/learning-page-images/lesson${lesson.lessonId}.png`;

  return (
    <div className="lesson-card">
      <div
        className="lesson-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="lesson-content">
        <h3 className="lesson-title">{lesson.category}</h3>
        <p className="lesson-description">{lesson.description}</p>
        <div className="lesson-meta">
          <span>{lesson.exercises.length} zadań</span>
          <span
            className={`lesson-level level-${lesson.difficultyLevel.toLowerCase()}`}
          >
            {lesson.difficultyLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
