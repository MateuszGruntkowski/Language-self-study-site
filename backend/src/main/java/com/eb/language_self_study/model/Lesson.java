package com.eb.language_self_study.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lessonId;
    private String category;
    private String description;
    private String difficultyLevel;
    private Integer xpReward;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Exercise> exercises;

//    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<UserLessonProgress> userLessonProgresses;

    public void updateXpReward() {
        if(exercises == null || exercises.isEmpty()) {
            this.xpReward = 0;
            return;
        }
        int totalXp = 0;
        for (Exercise exercise : exercises) {
            totalXp += exercise.getXpReward();
        }
        this.xpReward = totalXp;
    }

    @PrePersist
    @PreUpdate
    private void updateXpRewardBeforePersist() {
        updateXpReward();
        System.out.println("XP reward updated to: " + xpReward);
    }
}
