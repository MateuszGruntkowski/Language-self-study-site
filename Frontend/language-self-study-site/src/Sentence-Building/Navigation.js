import React from "react";
import "./styles/Navigation.css";

const Navigation = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <div className="navigation-container">
      <button
        className="navigation-button"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        Previous
      </button>
      <button
        className="navigation-button"
        onClick={onNext}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;
