import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import getListenAndRepeatExerciseData from "./data";
import "./styles.css";

const ListenAndRepeatPage = () => {
  // Initial exerciseId from URL params
  const params = useParams();
  const initialExerciseId = parseInt(params.exerciseId, 10);

  // State variables
  const [currentExerciseId, setCurrentExerciseId] = useState(initialExerciseId);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalExercises, setTotalExercises] = useState(5); // Każda lekcja ma dokładnie 5 zadań

  // navigate
  const navigate = useNavigate();

  // Obliczamy bazowy ID dla lekcji - pierwszy ID w serii 5 zadań dla danej lekcji
  const calculateBaseExerciseId = (exerciseId) => {
    return exerciseId - ((exerciseId - 1) % 5);
  };

  // Bazowy ID dla bieżącej lekcji
  const [baseExerciseId, setBaseExerciseId] = useState(
    calculateBaseExerciseId(initialExerciseId)
  );

  // Fetch exercise data when exerciseId changes
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setIsLoading(true);
        const exerciseData = await getListenAndRepeatExerciseData(
          currentExerciseId
        );
        console.log("Fetched exercise data:", exerciseData);
        setCurrentExercise(exerciseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
        setIsLoading(false);
      }
    };

    fetchExercise();
  }, [currentExerciseId]);

  // Obliczenie pozycji w lekcji (1-5) na podstawie globalnego ID ćwiczenia
  const getPositionInLesson = (exerciseId) => {
    return ((exerciseId - 1) % 5) + 1;
  };

  // Function to play audio
  const playAudio = () => {
    if (currentExercise && currentExercise.audioUrl) {
      const audio = new Audio(currentExercise.audioUrl);
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
        alert(`Could not play audio for "${currentExercise.textToRepeat}"`);
      });
    }
  };

  // Navigation functions
  const goToPrevious = () => {
    // Sprawdzanie czy jesteśmy na pierwszym zadaniu w lekcji
    if (currentExerciseId > baseExerciseId) {
      setCurrentExerciseId(currentExerciseId - 1);
    }
  };

  const goToNext = () => {
    // Sprawdzanie czy jesteśmy na ostatnim zadaniu w lekcji
    if (currentExerciseId < baseExerciseId + totalExercises - 1) {
      setCurrentExerciseId(currentExerciseId + 1);
    }
  };

  // Przy każdej zmianie exerciseId, aktualizuj baseExerciseId
  useEffect(() => {
    setBaseExerciseId(calculateBaseExerciseId(currentExerciseId));
  }, [currentExerciseId]);

  // Function to go to the next exercise type
  const goToNextExerciseType = () => {
    const linkToNextExercise = `/sentence-arrangement/${currentExerciseId + 1}`;
    navigate(linkToNextExercise);
  };

  if (isLoading && !currentExercise) {
    return <div className="lr-loading">Loading...</div>;
  }

  return (
    <div className="lr-container">
      <div className="lr-card">
        <div className="lr-header">
          <h1 className="lr-title">Listen & Repeat</h1>
          <div className="lr-progress">
            {getPositionInLesson(currentExerciseId)}/{totalExercises}
          </div>
        </div>

        {currentExercise && (
          <>
            <div className="lr-player">
              <button onClick={playAudio} className="lr-play-button">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>

            <div className="lr-english-word">
              {currentExercise.textToRepeat}
            </div>
            <div className="lr-polish-translation">
              {currentExercise.translation}
            </div>

            {/* <div className="lr-image-container">
              {currentExercise.imageUrl ? (
                <img
                  src={currentExercise.imageUrl}
                  alt={`${currentExercise.textToRepeat} image`}
                />
              ) : (
                <img
                  src="/api/placeholder/250/250"
                  alt={`${currentExercise.textToRepeat} image`}
                />
              )}
            </div> */}
          </>
        )}

        <div className="lr-navigation">
          <button
            onClick={goToPrevious}
            disabled={currentExerciseId === baseExerciseId || isLoading}
            className={`lr-nav-button ${
              currentExerciseId === baseExerciseId || isLoading
                ? "lr-button-disabled"
                : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            disabled={
              currentExerciseId === baseExerciseId + totalExercises - 1 ||
              isLoading
            }
            className={`lr-nav-button ${
              currentExerciseId === baseExerciseId + totalExercises - 1 ||
              isLoading
                ? "lr-button-disabled"
                : ""
            }`}
          >
            Next
          </button>
        </div>

        {currentExerciseId === baseExerciseId + totalExercises - 1 && (
          <div className="lr-next-exercise-container">
            <button
              onClick={goToNextExerciseType}
              className="lr-next-exercise-button"
            >
              Next exercise
            </button>
          </div>
        )}

        {isLoading && <div className="lr-loading-overlay">Loading...</div>}
      </div>
    </div>
  );
};

export default ListenAndRepeatPage;
