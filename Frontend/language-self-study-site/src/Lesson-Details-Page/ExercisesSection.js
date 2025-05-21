import React from "react";
import ExerciseCard from "./ExerciseCard";
import "./styles/ExercisesSection.css";

const ExercisesSection = ({ exercises }) => {
  console.log("Exercises Categories:", exercises);
  // const getIcon = (type) => {
  //   switch (type) {
  //     case "LISTEN_AND_REPEAT":
  //       return icons.listenAndRepeat;
  //     case "SENTENCE_ARRANGEMENT":
  //       return icons.sentenceArrangement;
  //     case "TRANSLATION_QUIZ":
  //       return icons.quiz;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="lesson-detail-content">
      <h2 className="lesson-exercises-title">Exercises</h2>
      <div className="lesson-exercises-grid">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            icon={exercise.icon}
            type={exercise.type}
            description={exercise.description}
            xp={exercise.xpReward}
            link={exercise.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ExercisesSection;
