package com.eb.language_self_study.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Controller;

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

//    public void setWordOptions(String[] options) throws JsonProcessingException {
//        this.wordOptions = new ObjectMapper().writeValueAsString(options);
//    }
//
//    public String[] getWordOptions() throws JsonProcessingException {
//        return new ObjectMapper().readValue(this.wordOptions, String[].class);
//    }

}
