package com.eb.language_self_study.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Flashcards")
public class Flashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flashcardId;
    private String frontContent;
    private String backContent;
    private int repetitionCount;
    private Date createdAt;
    private int xpReward;

    @ManyToOne
    @JoinColumn(name = "flashcard_set_id", nullable = false)
    @JsonBackReference
    private FlashcardSet flashcardSet;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

}
