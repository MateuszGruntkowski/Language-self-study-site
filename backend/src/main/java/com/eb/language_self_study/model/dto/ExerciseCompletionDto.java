package com.eb.language_self_study.model.dto;

import com.eb.language_self_study.enums.ExerciseType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExerciseCompletionDto {
    private ExerciseType exerciseType;
}
