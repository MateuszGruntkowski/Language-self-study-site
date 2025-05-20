import React from "react";
import "./styles/Controls.css";

const Controls = ({ onCheck, onReset }) => {
  return (
    <div className="controls-container">
      <button className="check-button" onClick={onCheck}>
        Check Answer
      </button>
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;
