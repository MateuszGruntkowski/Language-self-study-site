import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import getListenAndRepeatExerciseData from "./data";
import {
  addXpToUser,
  updateUserStatistics,
} from "../Services/userProgressService";
import "./styles.css";

const ListenAndRepeatPage = () => {
  // Get lessonId from URL params
  const params = useParams();
  const lessonId = parseInt(params.lessonId, 10);

  // State variables
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  // Navigate hook
  const navigate = useNavigate();

  // Fetch all exercises for the lesson on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const exercisesData = await getListenAndRepeatExerciseData(lessonId);
        console.log("Fetched exercises data:", exercisesData);

        if (exercisesData && exercisesData.length > 0) {
          // Sort exercises by orderInLesson to ensure correct order
          const sortedExercises = exercisesData.sort(
            (a, b) => a.orderInLesson - b.orderInLesson
          );
          setExercises(sortedExercises);
        } else {
          setError("No exercises found for this lesson");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exercises data:", error);
        setError("Failed to load exercises");
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [lessonId]);

  // Get current exercise
  const currentExercise = exercises[currentExerciseIndex];
  const totalExercises = exercises.length;

  // Function to play audio and mark exercise as completed
  const playAudio = async () => {
    if (currentExercise && currentExercise.audioUrl) {
      const audio = new Audio(currentExercise.audioUrl);

      try {
        await audio.play();

        // Mark exercise as completed and add XP if not already completed
        if (!completedExercises.has(currentExerciseIndex)) {
          setCompletedExercises(
            (prev) => new Set([...prev, currentExerciseIndex])
          );

          // Add XP for this exercise
          if (currentExercise.xpReward) {
            try {
              await addXpToUser(currentExercise.xpReward);
            } catch (error) {
              // XP addition failed, but exercise is still marked as completed
              console.error("Failed to add XP, but exercise completed");
            }
          }
        }
      } catch (error) {
        console.error("Failed to play audio:", error);
        alert(`Could not play audio for "${currentExercise.textToRepeat}"`);
      }
    }
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  // Function to go to the next exercise type
  const goToNextExerciseType = async () => {
    // Check if all exercises are completed and update final statistics
    if (completedExercises.size === totalExercises) {
      try {
        await updateUserStatistics("LISTEN_AND_REPEAT");
      } catch (error) {
        // Statistics update failed, but continue to next exercise
        console.error("Failed to update statistics, but continuing");
      }
    }

    const linkToNextExercise = `/${lessonId}/sentence-arrangement`;
    navigate(linkToNextExercise);
  };

  // Check if all exercises are completed
  const allExercisesCompleted = completedExercises.size === totalExercises;

  // Loading state
  if (isLoading) {
    return <div className="lr-loading">Loading exercises...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="lr-container">
        <div className="lr-card">
          <div className="lr-error">
            <h2>Error</h2>
            <p>{error}</p>
            <Link to="/learn" className="lr-nav-button">
              Back to Lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // No exercises state
  if (totalExercises === 0) {
    return (
      <div className="lr-container">
        <div className="lr-card">
          <div className="lr-error">
            <h2>No Exercises Found</h2>
            <p>No Listen & Repeat exercises found for this lesson.</p>
            <Link to="/learn" className="lr-nav-button">
              Back to Lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lr-container">
      <div className="lr-card">
        <div className="lr-header">
          <h1 className="lr-title">Listen & Repeat</h1>
          <div className="lr-progress">
            {currentExerciseIndex + 1}/{totalExercises}
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

            {/* XP reward display with completion status */}
            <div className="lr-xp-container">
              <span className="lr-xp-icon">
                {completedExercises.has(currentExerciseIndex) ? "✅" : "⭐"}
              </span>
              <span className="lr-xp-text">
                {currentExercise.xpReward} XP
                {completedExercises.has(currentExerciseIndex) &&
                  " - Completed!"}
              </span>
            </div>
          </>
        )}

        <div className="lr-navigation">
          <button
            onClick={goToPrevious}
            disabled={currentExerciseIndex === 0}
            className={`lr-nav-button ${
              currentExerciseIndex === 0 ? "lr-button-disabled" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            disabled={currentExerciseIndex === totalExercises - 1}
            className={`lr-nav-button ${
              currentExerciseIndex === totalExercises - 1
                ? "lr-button-disabled"
                : ""
            }`}
          >
            Next
          </button>
        </div>

        {/* Show "Next exercise" button only on the last exercise */}
        {currentExerciseIndex === totalExercises - 1 && (
          <div className="lr-next-exercise-container">
            <button
              onClick={goToNextExerciseType}
              className="lr-next-exercise-button"
            >
              Next exercise
            </button>
            {allExercisesCompleted && (
              <div className="lr-completion-message">
                🎉 All exercises completed! Great job!
              </div>
            )}
          </div>
        )}

        {/* Exercise indicator dots with completion status */}
        <div className="lr-indicators">
          {exercises.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentExerciseIndex(index)}
              className={`lr-indicator ${
                index === currentExerciseIndex ? "lr-indicator-active" : ""
              } ${
                completedExercises.has(index) ? "lr-indicator-completed" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListenAndRepeatPage;
