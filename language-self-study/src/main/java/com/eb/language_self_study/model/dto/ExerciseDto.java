package com.eb.language_self_study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class ExerciseDto {
    private Long exerciseId;
    private String type;
    private int xpReward;
    private int orderInLesson;
}
