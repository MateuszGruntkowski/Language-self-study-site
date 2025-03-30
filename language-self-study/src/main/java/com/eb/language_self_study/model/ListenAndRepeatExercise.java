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
@Table(name = "ListenAndRepeatExercises")
public class ListenAndRepeatExercise extends Exercise {

    private String textToRepeat;
    private String translation;
}
