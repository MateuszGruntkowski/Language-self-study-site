// components/LessonCard.js
import React from "react";
import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
  const imageUrl = `/images/learning-page-images/lesson${lesson.lessonId}.png`;

  return (
    <Link
      to={`/lesson-details/${lesson.lessonId}`}
      state={{ lesson: lesson }}
      style={{ textDecoration: "none" }}
    >
      <div className="lesson-card">
        <div
          className="lesson-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="lesson-content">
          <h3 className="lesson-title">{lesson.category}</h3>
          <p className="lesson-description">{lesson.description}</p>
          <div className="lesson-meta">
            <span>{lesson.xpReward} XP</span>
            <span
              className={`lesson-level level-${lesson.difficultyLevel.toLowerCase()}`}
            >
              {lesson.difficultyLevel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LessonCard;
