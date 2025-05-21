import React from "react";
import { Link } from "react-router-dom";
import "./styles/ExerciseCard.css";

const ExerciseCard = ({ id, icon, type, description, xp }) => {
  return (
    <Link className="exercise-card" id={id}>
      <div className="exercise-icon">{icon}</div>
      <h3 className="exercise-title">{type}</h3>
      <p className="exercise-description">{description}</p>
      <span className="exercise-xp">{xp} XP</span>
    </Link>
  );
};

export default ExerciseCard;
