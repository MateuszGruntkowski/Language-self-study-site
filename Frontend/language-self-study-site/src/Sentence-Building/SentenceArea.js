import React from "react";
import "./styles/SentenceArea.css";

const SentenceArea = ({
  words,
  onDragStart,
  onDragEnd,
  onDrop,
  onWordClick,
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop();
  };

  const handleDragStart = (e, word) => {
    onDragStart(word);
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    onDragEnd();
  };

  return (
    <div
      className="sentence-area"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {words.map((word) => (
        <div
          key={word.id}
          className="sentence-word"
          draggable
          onDragStart={(e) => handleDragStart(e, word)}
          onDragEnd={handleDragEnd}
          onClick={() => onWordClick(word.id)}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

export default SentenceArea;
