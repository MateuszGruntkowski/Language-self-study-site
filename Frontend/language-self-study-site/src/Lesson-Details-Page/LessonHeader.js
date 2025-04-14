import React from "react";
import "./styles/LessonHeader.css";

const LessonHeader = ({ title, level, description }) => {
  return (
    <div className="lesson-detail-header">
      <h1 className="lesson-detail-title">{title}</h1>
      <span className="lesson-detail-tag">{level}</span>
      <p className="lesson-detail-description">{description}</p>
    </div>
  );
};

export default LessonHeader;
