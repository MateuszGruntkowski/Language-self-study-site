import React, { useEffect } from "react";
import "./styles/LessonProgress.css";

const LessonProgress = ({ completed, total, percentage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const progressBar = document.querySelector(".progress-bar");
      if (progressBar) {
        progressBar.style.width = `${percentage}%`;
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="lesson-progress-section">
      <h3 className="lesson-progress-title">Your Progress</h3>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: "0%" }}></div>
      </div>
      <div className="progress-text">
        <span>
          {completed}/{total} exercises completed
        </span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

export default LessonProgress;
