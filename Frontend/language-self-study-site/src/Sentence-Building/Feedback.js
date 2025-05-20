import React from "react";
import "./styles/Feedback.css";

const Feedback = ({ show, isCorrect, message, correctSentence }) => {
  if (!show && !correctSentence) return null;

  return (
    <>
      {show && (
        <div className={isCorrect ? "feedback-success" : "feedback-error"}>
          {message}
        </div>
      )}

      {correctSentence && (
        <div className="correct-sentence">Correct: {correctSentence}</div>
      )}
    </>
  );
};

export default Feedback;
