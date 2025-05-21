import React from "react";
import ExerciseCard from "./ExerciseCard";
import "./styles/ExercisesSection.css";

const ExercisesSection = ({ exercises, icons }) => {
  const getIcon = (type) => {
    switch (type) {
      case "listen_and_repeat":
        return icons.listenAndRepeat;
      case "sentence_arrangement":
        return icons.sentenceArrangement;
      case "translation_quiz":
        return icons.quiz;
      default:
        return null;
    }
  };

  return (
    <div className="lesson-detail-content">
      <h2 className="lesson-exercises-title">Exercises</h2>
      <div className="lesson-exercises-grid">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.exerciseId}
            id={exercise.exerciseId}
            icon={getIcon(exercise.type)}
            type={
              exercise.type.charAt(0).toUpperCase() +
              exercise.type.slice(1).replaceAll("_", " ")
            }
            description={exercise.description}
            xp={exercise.xpReward}
            // link={exercise.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ExercisesSection;
