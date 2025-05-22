import { useEffect, useRef, React } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/NextExercise.css";

const NextExercise = ({ isLastSentence, currentSentence, lessonId }) => {
  const navigate = useNavigate();
  // Funkcja do przejścia do następnego ćwiczenia
  const goToNextExerciseType = () => {
    const linkToNextExercise = `/${lessonId}/translation-quiz`;
    navigate(linkToNextExercise);
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
    <div className="sb-next-exercise-container" ref={nextExerciseRef}>
      <button
        onClick={goToNextExerciseType}
        className="sb-next-exercise-button"
      >
        Next exercise
      </button>
    </div>
  );
};

export default NextExercise;
