package com.eb.language_self_study.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SentenceArrangementExercises")
public class SentenceArrangementExercise extends Exercise {

    private String correctSentence;

    @Column(columnDefinition = "JSON")
    private String wordOptions;

    private String translation;


}
