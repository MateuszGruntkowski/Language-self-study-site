import { useState } from "react";
import { useEffect, useRef } from "react";
import "./styles.css"; // Załączenie zewnętrznego pliku CSS

const ListenRepeatAndRepeatPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Przykładowe dane
  const words = [
    { english: "Apple", polish: "Jabłko", audioSrc: "/audio/apple.mp3" },
    { english: "House", polish: "Dom", audioSrc: "/audio/house.mp3" },
    { english: "Car", polish: "Samochód", audioSrc: "/audio/car.mp3" },
    { english: "Book", polish: "Książka", audioSrc: "/audio/book.mp3" },
  ];

  const totalWords = words.length;
  const currentWord = words[currentIndex];

  // Funkcja do odtwarzania dźwięku
  const playAudio = () => {
    // W rzeczywistej implementacji tutaj byłoby odtwarzanie audio
    alert(`Odtwarzanie dźwięku: "${currentWord.english}"`);
  };

  // Funkcje nawigacji
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Funkcja do przejścia do następnego ćwiczenia
  const goToNextExercise = () => {
    // W rzeczywistej implementacji tutaj byłoby przekierowanie do następnego ćwiczenia
    alert("Przejście do następnego ćwiczenia");
  };

  // Funkcja do wyświetlania przycisku "Następne ćwiczenie"
  const nextExerciseRef = useRef(null);
  const showNextExerciseButton = () => {
    if (currentIndex === totalWords - 1) {
      nextExerciseRef.current.style.display = "flex";
    } else {
      nextExerciseRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    showNextExerciseButton();
  }, [currentIndex]);

  return (
    <div className="lr-container">
      <div className="lr-card">
        <div className="lr-header">
          <h1 className="lr-title">Listen & Repeat</h1>
          <div className="lr-progress">
            {currentIndex + 1}/{totalWords}
          </div>
        </div>

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

        <div className="lr-english-word">{currentWord.english}</div>
        <div className="lr-polish-translation">{currentWord.polish}</div>

        <div className="lr-image-container">
          <img
            src="/api/placeholder/250/250"
            alt={`${currentWord.english} image`}
          />
        </div>

        <div className="lr-navigation">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`lr-nav-button ${
              currentIndex === 0 ? "lr-button-disabled" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === totalWords - 1}
            className={`lr-nav-button ${
              currentIndex === totalWords - 1 ? "lr-button-disabled" : ""
            }`}
          >
            Next
          </button>
        </div>

        <div className="lr-next-exercise-container" ref={nextExerciseRef}>
          <button
            onClick={goToNextExercise}
            className="lr-next-exercise-button"
          >
            Next exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListenRepeatAndRepeatPage;
