package com.eb.language_self_study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserStatisticsDto {
    private Long userId;
    private int completedExercisesCount;
    private int listenAndRepeatCount;
    private int sentenceArrangementCount;
    private int translationQuizCount;
    private int totalXp;

}
