package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.TranslationQuizExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TranslationQuizExerciseRepository extends JpaRepository<TranslationQuizExercise, Long> {
    List<TranslationQuizExercise> findAllByLesson_lessonId(Long lessonId);
    // Custom query methods can be defined here if needed

    // For example, to find exercises by lesson ID:
    // List<TranslationQuizExercise> findAllByLessonId(Long lessonId);
}
