// SentenceBuilder.jsx - Main component
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import getSentenceArrangementExerciseData from "./data";
import {
  addXpToUser,
  updateUserStatistics,
} from "../Services/userProgressService";
import WordsContainer from "./WordsContainer";
import SentenceArea from "./SentenceArea";
import Controls from "./Controls";
import Feedback from "./Feedback";
import Navigation from "./Navigation";
import NextExercise from "./NextExercise";
import "./styles/SentenceBuilder.css";

const SentenceBuilder = () => {
  const params = useParams();
  const lessonId = parseInt(params.lessonId, 10);

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentSentence, setCurrentSentence] = useState(0);
  const [availableWords, setAvailableWords] = useState([]);
  const [sentenceWords, setSentenceWords] = useState([]);
  const [feedback, setFeedback] = useState({
    show: false,
    isCorrect: false,
    message: "",
  });
  const [showCorrectSentence, setShowCorrectSentence] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const draggedItem = useRef(null);
  const draggedSource = useRef(null);
  const hasUpdatedStats = useRef(false);

  // Fetch exercise data from API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const exerciseData = await getSentenceArrangementExerciseData(lessonId);
        console.log("Fetched exercise data:", exerciseData);
        setExercises(exerciseData);
        setError(null);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
        setError("Failed to load exercises. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [lessonId]);

  // Load first sentence when exercises are loaded
  useEffect(() => {
    if (exercises.length > 0) {
      loadSentence(0);
    }
  }, [exercises]);

  // Update statistics when all exercises are completed
  useEffect(() => {
    const updateStatistics = async () => {
      if (
        exercises.length > 0 &&
        completedExercises.size === exercises.length &&
        !hasUpdatedStats.current
      ) {
        try {
          hasUpdatedStats.current = true;
          await updateUserStatistics("SENTENCE_ARRANGEMENT");
          console.log("Statistics updated successfully");
        } catch (error) {
          console.error("Error updating statistics:", error);
          hasUpdatedStats.current = false; // Reset on error
        }
      }
    };

    updateStatistics();
  }, [completedExercises, exercises.length]);

  const loadSentence = (index) => {
    if (!exercises[index]) return;

    // Reset state
    setFeedback({ show: false, isCorrect: false, message: "" });
    setShowCorrectSentence(false);
    setSentenceWords([]);

    // Parse wordOptions JSON string and create word objects
    const wordOptionsArray = JSON.parse(exercises[index].wordOptions);
    const words = wordOptionsArray.map((word, i) => ({
      id: `word-${index}-${i}`,
      text: word,
      visible: true,
    }));

    // Shuffle words randomly
    setAvailableWords([...words].sort(() => Math.random() - 0.5));
  };

  const handleDragStart = (word, source) => {
    draggedItem.current = word;
    draggedSource.current = source;
  };

  const handleDragEnd = () => {
    // Operation completed in handleDrop
  };

  const handleDropInSentenceArea = () => {
    if (!draggedItem.current) return;

    if (draggedSource.current === "availableWords") {
      // Move word from available words to sentence
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
      // Move word back to available words
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
    // Remove word from sentence and add back to available words
    setSentenceWords(sentenceWords.filter((word) => word.id !== wordId));
    setAvailableWords(
      availableWords.map((word) =>
        word.id === wordId ? { ...word, visible: true } : word
      )
    );
  };

  const checkAnswer = async () => {
    if (!exercises[currentSentence]) return;

    const userSentence = sentenceWords.map((word) => word.text).join(" ");
    const correctSentence = exercises[currentSentence].correctSentence;
    const isCorrect =
      userSentence.toLowerCase() === correctSentence.toLowerCase();

    if (isCorrect) {
      // Mark this exercise as completed
      setCompletedExercises((prev) => new Set([...prev, currentSentence]));

      // Add XP for correct answer
      const xpReward = exercises[currentSentence].xpReward;
      try {
        await addXpToUser(xpReward);
        console.log(`Successfully added ${xpReward} XP to user`);
      } catch (error) {
        console.error("Error adding XP:", error);
      }

      setFeedback({
        show: true,
        isCorrect: true,
        message: `Great job! Your sentence is correct. +${xpReward} XP`,
      });
    } else {
      setFeedback({
        show: true,
        isCorrect: false,
        message: "Not quite right. Try again.",
      });
    }

    setShowCorrectSentence(!isCorrect);
  };

  const resetSentence = () => {
    // Return all words to the pool
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
    if (currentSentence < exercises.length - 1) {
      setCurrentSentence(currentSentence + 1);
      loadSentence(currentSentence + 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="sentence-builder-container">
        <div className="sentence-builder-card">
          <div className="loading">Loading exercises...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="sentence-builder-container">
        <div className="sentence-builder-card">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  // No exercises found
  if (exercises.length === 0) {
    return (
      <div className="sentence-builder-container">
        <div className="sentence-builder-card">
          <div className="no-exercises">No exercises found.</div>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentSentence];

  return (
    <div className="sentence-builder-container">
      <div className="sentence-builder-card">
        <div className="header-container">
          <h1 className="header-title">Sentence Builder</h1>
          <div className="exercise-info">
            <div className="exercise-counter">
              {currentSentence + 1}/{exercises.length}
            </div>
            <div className="sa-xp-container">
              <span className="sa-xp-icon">⭐</span>
              <span className="sa-xp-text">{currentExercise.xpReward} XP</span>
            </div>
          </div>
        </div>

        {currentExercise?.translation && (
          <div className="translation">
            <strong>Translation:</strong> {currentExercise.translation}
          </div>
        )}

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
            showCorrectSentence ? currentExercise?.correctSentence : null
          }
        />

        <Navigation
          onPrevious={goToPrevious}
          onNext={goToNext}
          isPreviousDisabled={currentSentence === 0}
          isNextDisabled={currentSentence === exercises.length - 1}
        />

        <NextExercise
          onNext={goToNext}
          isLastSentence={currentSentence === exercises.length - 1}
          currentSentence={currentSentence}
          lessonId={lessonId}
        />
      </div>
    </div>
  );
};

export default SentenceBuilder;
