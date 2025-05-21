// SentenceBuilder.jsx - Main component
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import getSentenceArrangementExerciseData from "./data";
import WordsContainer from "./WordsContainer";
import SentenceArea from "./SentenceArea";
import Controls from "./Controls";
import Feedback from "./Feedback";
import Navigation from "./Navigation";
import NextExercise from "./NextExercise";
import "./styles/SentenceBuilder.css";

// Przykładowe dane ćwiczeń
const sentences = [
  {
    id: 1,
    words: ["yesterday", "went", "to", "the", "I", "cinema"],
    correctSentence: "I went to the cinema yesterday",
  },
  {
    id: 2,
    words: ["English", "speaks", "fluently", "she", "very"],
    correctSentence: "she speaks English very fluently",
  },
  {
    id: 3,
    words: ["tomorrow", "will", "to", "beach", "go", "we", "the"],
    correctSentence: "we will go to the beach tomorrow",
  },
];

const SentenceBuilder = () => {
  const params = useParams();
  const exerciseId = parseInt(params.exerciseId, 10);

  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const exerciseData = await getSentenceArrangementExerciseData(
          exerciseId
        );
        console.log("Fetched exercise data:", exerciseData);
        setExercise(exerciseData);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };
    fetchExercise();
  }, [exerciseId]);

  const [currentSentence, setCurrentSentence] = useState(0);
  const [availableWords, setAvailableWords] = useState([]);
  const [sentenceWords, setSentenceWords] = useState([]);
  const [feedback, setFeedback] = useState({
    show: false,
    isCorrect: false,
    message: "",
  });
  const [showCorrectSentence, setShowCorrectSentence] = useState(false);
  const draggedItem = useRef(null);
  const draggedSource = useRef(null);

  // Załadowanie ćwiczenia przy montowaniu komponentu
  useEffect(() => {
    loadSentence(currentSentence);
  }, []);

  const loadSentence = (index) => {
    // Resetowanie stanu
    setFeedback({ show: false, isCorrect: false, message: "" });
    setShowCorrectSentence(false);
    setSentenceWords([]);

    // Tworzenie obiektów słów z unikalnymi identyfikatorami
    const words = sentences[index].words.map((word, i) => ({
      id: `word-${index}-${i}`,
      text: word,
      visible: true,
    }));

    // Losowa kolejność słów
    setAvailableWords([...words].sort(() => Math.random() - 0.5));
  };

  const handleDragStart = (word, source) => {
    draggedItem.current = word;
    draggedSource.current = source;
  };

  const handleDragEnd = () => {
    // Operacja zakończona w handleDrop
  };

  const handleDropInSentenceArea = () => {
    if (!draggedItem.current) return;

    if (draggedSource.current === "availableWords") {
      // Przeniesienie słowa z dostępnych słów do zdania
      setAvailableWords(
        availableWords.map((word) =>
          word.id === draggedItem.current.id
            ? { ...word, visible: false }
            : word
        )
      );
      setSentenceWords([...sentenceWords, draggedItem.current]);
    }

    draggedItem.current = null;
  };

  const handleDropInWordsContainer = () => {
    if (!draggedItem.current) return;

    if (draggedSource.current === "sentenceWords") {
      // Przeniesienie słowa z powrotem do dostępnych słów
      setSentenceWords(
        sentenceWords.filter((word) => word.id !== draggedItem.current.id)
      );
      setAvailableWords(
        availableWords.map((word) =>
          word.id === draggedItem.current.id ? { ...word, visible: true } : word
        )
      );
    }

    draggedItem.current = null;
  };

  const handleWordClickInSentence = (wordId) => {
    // Usunięcie słowa ze zdania i dodanie z powrotem do dostępnych słów
    setSentenceWords(sentenceWords.filter((word) => word.id !== wordId));
    setAvailableWords(
      availableWords.map((word) =>
        word.id === wordId ? { ...word, visible: true } : word
      )
    );
  };

  const checkAnswer = () => {
    const userSentence = sentenceWords.map((word) => word.text).join(" ");
    const isCorrect =
      userSentence.toLowerCase() ===
      sentences[currentSentence].correctSentence.toLowerCase();

    setFeedback({
      show: true,
      isCorrect,
      message: isCorrect
        ? "Great job! Your sentence is correct."
        : "Not quite right. Try again.",
    });

    setShowCorrectSentence(!isCorrect);
  };

  const resetSentence = () => {
    // Przywrócenie wszystkich słów do puli
    setAvailableWords(
      availableWords.map((word) => ({ ...word, visible: true }))
    );
    setSentenceWords([]);
    setFeedback({ show: false, isCorrect: false, message: "" });
    setShowCorrectSentence(false);
  };

  const goToPrevious = () => {
    if (currentSentence > 0) {
      setCurrentSentence(currentSentence - 1);
      loadSentence(currentSentence - 1);
    }
  };

  const goToNext = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      loadSentence(currentSentence + 1);
    }
  };

  return (
    <div className="sentence-builder-container">
      <div className="sentence-builder-card">
        <div className="header-container">
          <h1 className="header-title">Sentence Builder</h1>
          <div className="exercise-counter">
            {currentSentence + 1}/{sentences.length}
          </div>
        </div>

        <div className="instructions">
          Arrange the words to form a correct English sentence.
          <br />
          Drag words from below to the sentence area.
        </div>

        <WordsContainer
          words={availableWords}
          onDragStart={(word) => handleDragStart(word, "availableWords")}
          onDragEnd={handleDragEnd}
          onDrop={handleDropInWordsContainer}
        />

        <SentenceArea
          words={sentenceWords}
          onDragStart={(word) => handleDragStart(word, "sentenceWords")}
          onDragEnd={handleDragEnd}
          onDrop={handleDropInSentenceArea}
          onWordClick={handleWordClickInSentence}
        />

        <Controls onCheck={checkAnswer} onReset={resetSentence} />

        <Feedback
          show={feedback.show}
          isCorrect={feedback.isCorrect}
          message={feedback.message}
          correctSentence={
            showCorrectSentence
              ? sentences[currentSentence].correctSentence
              : null
          }
        />

        <Navigation
          onPrevious={goToPrevious}
          onNext={goToNext}
          isPreviousDisabled={currentSentence === 0}
          isNextDisabled={currentSentence === sentences.length - 1}
        />

        <NextExercise
          onNext={goToNext}
          isLastSentence={currentSentence === sentences.length - 1}
          currentSentence={currentSentence}
        />
      </div>
    </div>
  );
};

export default SentenceBuilder;
