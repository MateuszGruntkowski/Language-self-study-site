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

  // fetching lesson data
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

  // asigning icons to exercises
  // const icons = {
  //   listenAndRepeat: "🎧",
  //   sentenceArrangement: "📝",
  //   quiz: "❓",
  // };

  // calculating XP rewards for each exercise type
  let listenAndRepeatXpReward = 0;
  let sentenceArrangementXpReward = 0;
  let quizXpReward = 0;

  lesson.exercises.map((exercise) => {
    switch (exercise.type) {
      case "LISTEN_AND_REPEAT":
        listenAndRepeatXpReward += exercise.xpReward;
        break;
      case "SENTENCE_ARRANGEMENT":
        sentenceArrangementXpReward += exercise.xpReward;
        break;
      case "TRANSLATION_QUIZ":
        quizXpReward += exercise.xpReward;
        break;
    }
  });

  const exerciseCategories = [
    {
      type: "LISTEN_AND_REPEAT",
      description:
        "Listen to the audio and repeat the sentences. Focus on pronunciation and intonation.",
      xpReward: listenAndRepeatXpReward,
      icon: "🎧",
      link: `/${lesson.category}/listen-and-repeat/${lesson.exercises[0].exerciseId}`,
    },

    {
      type: "SENTENCE_ARRANGEMENT",
      description:
        "Arrange the words to form a correct sentence. Pay attention to grammar and word order.",
      xpReward: sentenceArrangementXpReward,
      icon: "📝",
      link: `/${lesson.category}/sentence-arrangement/${lesson.exercises[5].exerciseId}`,
    },

    {
      type: "TRANSLATION_QUIZ",
      description:
        "Translate the sentences from your native language to English. Focus on vocabulary and grammar.",
      xpReward: quizXpReward,
      icon: "❓",
      link: `/${lesson.category}/translation-quiz/${lesson.exercises[10].exerciseId}`,
    },
  ];

  return (
    <div className="lesson-detail-page">
      <div className="lesson-detail-container">
        <LessonHeader
          category={lesson.category}
          difficultyLevel={lesson.difficultyLevel}
          description={lesson.description}
        />

        {/* <LessonProgress
          completed={lessonData.progress.completed}
          total={lessonData.progress.total}
          percentage={lessonData.progress.percentage}
        /> */}

        <ExercisesSection exercises={exerciseCategories} />

        <LessonNavigation />
      </div>
    </div>
  );
};

export default LessonDetailsPage;
