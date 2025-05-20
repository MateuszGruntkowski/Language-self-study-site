import { useEffect, useRef, React } from "react";
import "./styles/NextExercise.css";

const NextExercise = ({ isLastSentence, currentSentence }) => {
  // Funkcja do przejścia do następnego ćwiczenia
  const goToNextExercise = () => {
    // W rzeczywistej implementacji tutaj byłoby przekierowanie do następnego ćwiczenia
    alert("Przejście do następnego ćwiczenia");
  };

  // Funkcja do wyświetlania przycisku "Następne ćwiczenie"
  const nextExerciseRef = useRef(null);
  const showNextExerciseButton = () => {
    if (isLastSentence) {
      nextExerciseRef.current.style.display = "flex";
    } else {
      nextExerciseRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    showNextExerciseButton();
  }, [currentSentence]);

  return (
    <div
      className="sb-next-exercise-container"
      //   style={{ display: "flex" }}
      ref={nextExerciseRef}
    >
      <button onClick={goToNextExercise} className="sb-next-exercise-button">
        Next exercise
      </button>
    </div>
  );
};

export default NextExercise;
