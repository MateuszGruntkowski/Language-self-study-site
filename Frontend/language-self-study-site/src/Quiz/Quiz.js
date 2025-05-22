import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getTranslationQuizData from "./data";
import "./styles/Quiz.css";

const LanguageQuiz = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  // State variables
  const [exercises, setExercises] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all quiz exercises for the lesson on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const exercisesData = await getTranslationQuizData(lessonId);
        console.log("Fetched quiz exercises data:", exercisesData);

        if (exercisesData && exercisesData.length > 0) {
          setExercises(exercisesData);
        } else {
          setError("No quiz exercises found for this lesson");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz exercises data:", error);
        setError("Failed to load quiz exercises");
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [lessonId]);

  // Get current exercise and total count
  const currentExercise = exercises[currentQuestionIndex];
  const totalQuestions = exercises.length;

  const handleAnswerClick = (answer, answerIndex) => {
    if (showFeedback) return;

    setSelectedAnswer({ answer, index: answerIndex });
    setShowFeedback(true);

    // Check if answer is correct using correctOptionIndex
    if (answerIndex === currentExercise.correctOptionIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  const goToMainPage = () => {
    navigate("/learn");
  };

  const getAnswerClass = (optionIndex) => {
    if (!showFeedback) return "";

    // Correct answer
    if (optionIndex === currentExercise.correctOptionIndex) {
      return "quiz-answer-correct";
    }

    // Selected wrong answer
    if (
      selectedAnswer &&
      optionIndex === selectedAnswer.index &&
      optionIndex !== currentExercise.correctOptionIndex
    ) {
      return "quiz-answer-incorrect";
    }

    return "";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <p>Ładowanie quizu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2>Błąd</h2>
          <p>{error}</p>
          <button className="quiz-main-page-button" onClick={goToMainPage}>
            Powrót do strony głównej
          </button>
        </div>
      </div>
    );
  }

  // No exercises state
  if (totalQuestions === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2>Brak pytań</h2>
          <p>Nie znaleziono pytań quizowych dla tej lekcji.</p>
          <button className="quiz-main-page-button" onClick={goToMainPage}>
            Powrót do strony głównej
          </button>
        </div>
      </div>
    );
  }

  // Quiz completed state
  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const totalXP = exercises.reduce(
      (sum, exercise) => sum + exercise.xpReward,
      0
    );
    const earnedXP = exercises
      .slice(0, score)
      .reduce((sum, exercise) => sum + exercise.xpReward, 0);

    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h1 className="quiz-title">Quiz zakończony!</h1>
          <div className="quiz-results">
            <p className="quiz-score">
              Twój wynik: {score} / {totalQuestions}
            </p>
            <p className="quiz-percentage">{percentage}%</p>
            <div className="quiz-xp-results">
              <span className="quiz-xp-icon">⭐</span>
              <span className="quiz-xp-earned">
                {earnedXP} / {totalXP} XP
              </span>
            </div>
          </div>
          <button className="quiz-restart-button" onClick={restartQuiz}>
            Rozpocznij ponownie
          </button>
        </div>
        <div className="main-page-div">
          <button className="quiz-main-page-button" onClick={goToMainPage}>
            Powrót do strony głównej
          </button>
        </div>
      </div>
    );
  }

  // Main quiz interface
  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title">Quiz językowy</h1>
          <p className="quiz-progress">
            Pytanie {currentQuestionIndex + 1} z {totalQuestions}
          </p>
        </div>

        <div className="quiz-question">
          <h2>{currentExercise.question}</h2>

          {/* XP reward display */}
          <div className="quiz-xp-container">
            <span className="quiz-xp-icon">⭐</span>
            <span className="quiz-xp-text">{currentExercise.xpReward} XP</span>
          </div>
        </div>

        <div className="quiz-answers">
          {currentExercise.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-answer-button ${getAnswerClass(index)}`}
              onClick={() => handleAnswerClick(option, index)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="quiz-feedback">
            {selectedAnswer.index === currentExercise.correctOptionIndex ? (
              <p className="quiz-feedback-correct">Poprawna odpowiedź!</p>
            ) : (
              <p className="quiz-feedback-incorrect">
                Niepoprawnie. Poprawna odpowiedź:{" "}
                {currentExercise.options[currentExercise.correctOptionIndex]}
              </p>
            )}
            <button className="quiz-next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex + 1 < totalQuestions
                ? "Następne pytanie"
                : "Zobacz wyniki"}
            </button>
          </div>
        )}

        <div className="quiz-score-display">
          Wynik: {score} / {totalQuestions}
        </div>

        {/* Progress indicators */}
        <div className="quiz-indicators">
          {exercises.map((_, index) => (
            <div
              key={index}
              className={`quiz-indicator ${
                index < currentQuestionIndex
                  ? "quiz-indicator-completed"
                  : index === currentQuestionIndex
                  ? "quiz-indicator-current"
                  : "quiz-indicator-upcoming"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageQuiz;
