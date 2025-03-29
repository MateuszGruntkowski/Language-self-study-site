package com.eb.language_self_study.model;

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
    private Long flashcard_id;
    private String frontContent;
    private String backContent;
    private int repetitionCount;
    private Date createdAt;
    private int xpReward;

    @ManyToOne
    @JoinColumn(name = "flashcardSet_id", nullable = false)
    private FlashcardSet flashcardSet;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }
}
