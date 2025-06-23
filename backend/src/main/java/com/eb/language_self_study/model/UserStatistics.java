package com.eb.language_self_study.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_statistics")
public class UserStatistics {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private int totalHoursSpent = 0;
    private int totalXp = 0;
    private int dailyStreak = 0;
    private int longestStreak = 0;
    private int completedLessonsCount = 0;
    private int completedExercisesCount = 0;
    private int listenAndRepeatCount = 0;
    private int sentenceArrangementCount = 0;
    private int translationQuizCount = 0;

}
