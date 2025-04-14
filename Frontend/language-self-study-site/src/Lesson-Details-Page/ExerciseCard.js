import React from "react";
import { Link } from "react-router-dom";
import "./styles/ExerciseCard.css";

const ExerciseCard = ({ id, icon, title, description, xp, link }) => {
  return (
    <Link to={link} className="exercise-card" id={id}>
      <div className="exercise-icon">{icon}</div>
      <h3 className="exercise-title">{title}</h3>
      <p className="exercise-description">{description}</p>
      <span className="exercise-xp">{xp} XP</span>
    </Link>
  );
};

export default ExerciseCard;
