import { useState, useEffect } from "react";
import "./styles/Quiz.css";

const LanguageQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const quizQuestions = [
    {
      question: "Co oznacza słowo 'apple'?",
      options: ["jabłko", "banan", "pomarańcza", "gruszka"],
      correctAnswer: "jabłko",
      image: "/api/placeholder/250/250", // Placeholder dla obrazka
    },
    {
      question: "Jak przetłumaczysz 'house'?",
      options: ["samochód", "dom", "drzewo", "okno"],
      correctAnswer: "dom",
      image: "/api/placeholder/250/250",
    },
    {
      question: "Co to jest 'dog'?",
      options: ["kot", "ryba", "pies", "ptak"],
      correctAnswer: "pies",
      image: "/api/placeholder/250/250",
    },
    {
      question: "Jak po angielsku powiemy 'książka'?",
      options: ["book", "page", "story", "letter"],
      correctAnswer: "book",
      image: "/api/placeholder/250/250",
    },
    {
      question: "Co oznacza 'water'?",
      options: ["woda", "ogień", "ziemia", "powietrze"],
      correctAnswer: "woda",
      image: "/api/placeholder/250/250",
    },
  ];

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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

  const getAnswerClass = (option) => {
    if (!showFeedback) return "";

    if (option === currentQuestion.correctAnswer) {
      return "quiz-answer-correct";
    }

    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return "quiz-answer-incorrect";
    }

    return "";
  };

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <div className="quiz-header">
            <h1 className="quiz-title">Quiz zakończony!</h1>
            <p className="quiz-score">
              Twój wynik: {score} / {quizQuestions.length}
            </p>
          </div>
          <div className="quiz-result-message">
            {score === quizQuestions.length ? (
              <p>Świetnie! Uzyskałeś maksymalną liczbę punktów!</p>
            ) : score >= quizQuestions.length / 2 ? (
              <p>Dobry wynik! Próbuj dalej, aby się doskonalić.</p>
            ) : (
              <p>Warto jeszcze poćwiczyć. Nie poddawaj się!</p>
            )}
          </div>
          <button className="quiz-restart-button" onClick={restartQuiz}>
            Rozpocznij ponownie
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
            Pytanie {currentQuestionIndex + 1} z {quizQuestions.length}
          </p>
        </div>

        <div className="quiz-question">
          <h2>{currentQuestion.question}</h2>
        </div>

        <div className="quiz-image-container">
          <img src={currentQuestion.image} alt="Obrazek do pytania" />
        </div>

        <div className="quiz-answers">
          {currentQuestion.options.map((option, index) => (
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
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <p className="quiz-feedback-correct">Poprawna odpowiedź!</p>
            ) : (
              <p className="quiz-feedback-incorrect">
                Niestety nie. Poprawna odpowiedź to:{" "}
                {currentQuestion.correctAnswer}
              </p>
            )}
            <button className="quiz-next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex < quizQuestions.length - 1
                ? "Następne pytanie"
                : "Zobacz wyniki"}
            </button>
          </div>
        )}

        <div className="quiz-score-display">
          Wynik: {score} / {quizQuestions.length}
        </div>
      </div>
    </div>
  );
};

export default LanguageQuiz;
