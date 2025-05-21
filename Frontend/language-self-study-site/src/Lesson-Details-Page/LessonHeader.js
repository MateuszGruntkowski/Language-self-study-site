import React from "react";
import "./styles/LessonHeader.css";

const LessonHeader = ({ category, difficultyLevel, description }) => {
  return (
    <div className="lesson-detail-header">
      <h1 className="lesson-detail-title">{category}</h1>
      <span className="lesson-detail-tag">{difficultyLevel}</span>
      <p className="lesson-detail-description">{description}</p>
    </div>
  );
};

export default LessonHeader;
