package com.eb.language_self_study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class LessonWithExercisesDto {
    private Long lessonId;
    private String category;
    private String description;
    private String difficultyLevel;
    private int xpReward;
    private List<ExerciseDto> exercises;

}
