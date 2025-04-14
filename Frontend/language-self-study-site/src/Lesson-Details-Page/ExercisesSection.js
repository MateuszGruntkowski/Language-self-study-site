import React from "react";
import ExerciseCard from "./ExerciseCard";
import "./styles/ExercisesSection.css";

const ExercisesSection = ({ exercises }) => {
  return (
    <div className="lesson-detail-content">
      <h2 className="lesson-exercises-title">Exercises</h2>
      <div className="lesson-exercises-grid">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            id={exercise.id}
            icon={exercise.icon}
            title={exercise.title}
            description={exercise.description}
            xp={exercise.xp}
            link={exercise.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ExercisesSection;
