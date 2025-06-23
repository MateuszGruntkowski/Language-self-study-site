package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.Exercise;
import com.eb.language_self_study.model.ListenAndRepeatExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
