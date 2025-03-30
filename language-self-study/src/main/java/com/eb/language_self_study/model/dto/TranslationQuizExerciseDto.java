package com.eb.language_self_study.model.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class TranslationQuizExerciseDto {
    private Long exerciseId;
    private String question;
    private String[] options;
    private int correctOptionIndex;
    private String translation;
}
