package com.eb.language_self_study.service;

import com.eb.language_self_study.model.Lesson;
import com.eb.language_self_study.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {

    private LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public List<Lesson> getLessons() {
        return lessonRepository.findAll();
    }
}
