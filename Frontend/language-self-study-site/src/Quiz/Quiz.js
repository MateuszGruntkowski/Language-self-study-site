import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getTranslationQuizData from "./data";
import "./styles/Quiz.css";

const QUIZ_LENGTH = 5; // Liczba pytań w lekcji

const LanguageQuiz = () => {
  const navigate = useNavigate();

  const { exerciseId } = useParams();
  const startingId = parseInt(exerciseId, 10);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Fetchuj quiz dla aktualnego pytania
  useEffect(() => {
    const fetchExercise = async () => {
      const currentId = startingId + currentQuestionIndex;
      try {
        const data = await getTranslationQuizData(currentId);
        setCurrentExercise(data);
      } catch (error) {
        console.error("Błąd przy pobieraniu quizu", error);
      }
    };

    if (currentQuestionIndex < QUIZ_LENGTH) {
      fetchExercise();
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, startingId]);

  const handleAnswerClick = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentExercise.translation) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestionIndex((prev) => prev + 1);
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

  const getAnswerClass = (option) => {
    if (!showFeedback) return "";
    if (option === currentExercise.translation) return "quiz-answer-correct";
    if (option === selectedAnswer && option !== currentExercise.translation)
      return "quiz-answer-incorrect";
    return "";
  };

  if (!currentExercise && !quizCompleted) return <p>Ładowanie...</p>;

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h1 className="quiz-title">Quiz zakończony!</h1>
          <p className="quiz-score">
            Twój wynik: {score} / {QUIZ_LENGTH}
          </p>
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

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title">Quiz językowy</h1>
          <p className="quiz-progress">
            Pytanie {currentQuestionIndex + 1} z {QUIZ_LENGTH}
          </p>
        </div>

        <div className="quiz-question">
          <h2>{currentExercise.question}</h2>
        </div>

        <div className="quiz-answers">
          {currentExercise.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-answer-button ${getAnswerClass(option)}`}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="quiz-feedback">
            {selectedAnswer === currentExercise.translation ? (
              <p className="quiz-feedback-correct">Poprawna odpowiedź!</p>
            ) : (
              <p className="quiz-feedback-incorrect">
                Niepoprawnie. Poprawna odpowiedź: {currentExercise.translation}
              </p>
            )}
            <button className="quiz-next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex + 1 < QUIZ_LENGTH
                ? "Następne pytanie"
                : "Zobacz wyniki"}
            </button>
          </div>
        )}

        <div className="quiz-score-display">
          Wynik: {score} / {QUIZ_LENGTH}
        </div>
      </div>
    </div>
  );
};

export default LanguageQuiz;
