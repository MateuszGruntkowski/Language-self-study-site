import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/LessonNavigation.css";

const LessonNavigation = () => {
  const params = useParams();
  const lessonIdParam = parseInt(params.lessonId, 10);

  const goToPreviousLesson = () => {
    if (lessonIdParam > 1) {
      return `/lesson-details/${lessonIdParam - 1}`;
    }
    return "/lesson-details/1";
  };

  const goToNextLesson = () => {
    if (lessonIdParam < 8) {
      return `/lesson-details/${lessonIdParam + 1}`;
    }
    return `/lesson-details/8`;
  };

  return (
    <div className="lesson-navigation">
      <Link to={`${goToPreviousLesson()}`} className="lesson-nav-button prev">
        <i>←</i> Previous Lesson
      </Link>
      <Link to={`${goToNextLesson()}`} className="lesson-nav-button next">
        Next Lesson <i>→</i>
      </Link>
    </div>
  );
};

export default LessonNavigation;
