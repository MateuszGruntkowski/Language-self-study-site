import React from "react";
import { Link } from "react-router-dom";
import "./styles/LessonNavigation.css";

const LessonNavigation = () => {
  return (
    <div className="lesson-navigation">
      <Link to="#" className="lesson-nav-button prev">
        <i>←</i> Previous Lesson
      </Link>
      <Link to="#" className="lesson-nav-button next">
        Next Lesson <i>→</i>
      </Link>
    </div>
  );
};

export default LessonNavigation;
