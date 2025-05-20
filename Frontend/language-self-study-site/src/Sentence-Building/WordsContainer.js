import React from "react";
import "./styles/WordsContainer.css";

const WordsContainer = ({ words, onDragStart, onDragEnd, onDrop }) => {
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
      className="words-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {words.map(
        (word) =>
          word.visible && (
            <div
              key={word.id}
              className="word-item"
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              onDragEnd={handleDragEnd}
            >
              {word.text}
            </div>
          )
      )}
    </div>
  );
};

export default WordsContainer;
