package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.ListenAndRepeatExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListenAndRepeatExerciseRepository extends JpaRepository<ListenAndRepeatExercise, Long> {
    List<ListenAndRepeatExercise> findAllByLesson_lessonId(Long lessonId);


    // Custom query methods can be defined here if needed

    // For example, to find exercises by lesson ID:
    // List<ListenAndRepeatExercise> findAllByLessonId(Long lessonId);
}
