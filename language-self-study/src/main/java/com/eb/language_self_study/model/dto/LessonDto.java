package com.eb.language_self_study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class LessonDto {
    private Long lessonId;
    private String category;
    private String description;
    private String difficultyLevel;
    private int xpReward;
}
