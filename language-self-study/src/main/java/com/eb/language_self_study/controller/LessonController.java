package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.Lesson;
import com.eb.language_self_study.service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LessonController {

    private LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/lessons")
    public ResponseEntity<List<Lesson>> getLessons() {
        List<Lesson> lessons = lessonService.getLessons();
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }
}
