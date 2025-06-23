package com.eb.language_self_study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class SentenceArrangementExerciseDto {
    private Long exerciseId;
    private String correctSentence;
    private String[] wordOptions;
    private String translation;

}
