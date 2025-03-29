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
@Table(name = "UserLessonProgresses", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "lesson_id"}))
public class UserLessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userLessonProgressId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    private int earnedXp = 0;
    private boolean completed = false;
    private Date startedAt;
    private Date completedAt;

    @PrePersist
    protected void onCreate() {
        this.startedAt = new Date();
    }
}
