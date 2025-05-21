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
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "exercises")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;
    private String type;
    private int xpReward;
    private int orderInLesson;
    private String description;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable=false)
    @JsonBackReference
    private Lesson lesson;

}
