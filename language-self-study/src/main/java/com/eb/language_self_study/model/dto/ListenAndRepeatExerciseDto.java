package com.eb.language_self_study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class ListenAndRepeatExerciseDto extends ExerciseDto {

    private String textToRepeat;
    private String translation;
    private String audioUrl;

}
