import React, { useState, useEffect, use } from "react";
import LessonHeader from "./LessonHeader";
import LessonProgress from "./LessonProgress";
import ExercisesSection from "./ExercisesSection";
import LessonNavigation from "./LessonNavigation";
import { useParams } from "react-router-dom";
import { getLessonData } from "./Lesson-Data";
import "./styles/LessonDetailsPage.css";

const LessonDetailsPage = () => {
  let params = useParams();
  const lessonId = params.lessonId;

  const [lesson, setLesson] = useState(null);
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData = await getLessonData(lessonId);
        console.log("Fetched lesson data:", lessonData);
        setLesson(lessonData);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };
    fetchLesson();
  }, [lessonId]);
  if (!lesson) return <div>Loading...</div>;

  const icons = {
    listenAndRepeat: "🎧",
    sentenceArrangement: "📝",
    quiz: "❓",
  };

  const lessonData = {
    title: "Business English",
    level: "Intermediate",
    description:
      "Master essential business vocabulary and communication skills for professional environments. This lesson covers common business phrases, negotiation techniques, and formal email writing.",
    progress: {
      completed: 1,
      total: 3,
      percentage: 33,
    },
    exercises: [
      {
        id: "listenAndRepeat",
        icon: "🎧",
        title: "Listen & Repeat",
        description:
          "Improve your pronunciation by listening and repeating key phrases and vocabulary.",
        xp: 50,
        link: "/listen-repeat-exercise",
      },
      {
        id: "sentenceOrdering",
        icon: "📝",
        title: "Sentence Ordering",
        description:
          "Układaj pomieszane zdania w logiczną i poprawną kolejność, aby tworzyć spójne wypowiedzi w języku angielskim",
        xp: 75,
        link: "/sentence-ordering-exercise",
      },
      {
        id: "quiz",
        icon: "❓",
        title: "Business Vocabulary Quiz",
        description:
          "Sprawdź swoją znajomość słownictwa i zasad komunikacji dzięki krótkim quizom.",
        xp: 100,
        link: "/quiz-exercise",
      },
    ],
  };

  return (
    <div className="lesson-detail-page">
      <div className="lesson-detail-container">
        <LessonHeader
          category={lesson.category}
          difficultyLevel={lesson.difficultyLevel}
          description={lesson.description}
        />

        <LessonProgress
          completed={lessonData.progress.completed}
          total={lessonData.progress.total}
          percentage={lessonData.progress.percentage}
        />

        <ExercisesSection exercises={lesson.exercises} icons={icons} />

        <LessonNavigation />
      </div>
    </div>
  );
};

export default LessonDetailsPage;
