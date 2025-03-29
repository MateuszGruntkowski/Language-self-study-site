package com.eb.language_self_study.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "TranslationQuizExercises")
public class TranslationQuizExercise extends Exercise {

    private String question;
    private String[] options;
    private int correctOptionIndex;
    private String translation;
}
