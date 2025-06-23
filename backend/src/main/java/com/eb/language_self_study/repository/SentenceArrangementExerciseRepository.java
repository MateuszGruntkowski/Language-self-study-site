package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.SentenceArrangementExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SentenceArrangementExerciseRepository extends JpaRepository<SentenceArrangementExercise, Long> {
    List<SentenceArrangementExercise> findAllByLesson_lessonId(Long lessonId);
    // Custom query methods can be defined here if needed

    // For example, to find exercises by lesson ID:
    // List<SentenceArrangementExercise> findAllByLessonId(Long lessonId);
}
