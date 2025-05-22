package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.ListenAndRepeatExercise;
import com.eb.language_self_study.model.dto.ListenAndRepeatExerciseDto;
import com.eb.language_self_study.service.ListenAndRepeatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api")
public class ListenAndRepeatController {

    private ListenAndRepeatService listenAndRepeatService;
    public ListenAndRepeatController(ListenAndRepeatService listenAndRepeatService) {
        this.listenAndRepeatService = listenAndRepeatService;
    }

    @GetMapping("/listen-and-repeat/{exercise_id}")
    public ResponseEntity<ListenAndRepeatExerciseDto> getListenAndRepeatData(@PathVariable Long exercise_id) {
        return new ResponseEntity<>(listenAndRepeatService.getListenAndRepeatData(exercise_id), HttpStatus.OK);
    }

    // zobaczyc czy dziala
    @GetMapping("/{lessonId}/listen-and-repeat")
    public ResponseEntity<List<ListenAndRepeatExerciseDto>> getListenAndRepeatExerciseByLessonId(@PathVariable Long lessonId) {
        List<ListenAndRepeatExerciseDto> exercises = listenAndRepeatService.getListenAndRepeatExerciseByLessonId(lessonId);
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }
}
