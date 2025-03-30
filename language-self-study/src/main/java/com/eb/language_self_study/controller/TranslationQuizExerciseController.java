package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.dto.TranslationQuizExerciseDto;
import com.eb.language_self_study.service.TranslationQuizExerciseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TranslationQuizExerciseController {

    private TranslationQuizExerciseService translationQuizExerciseService;

    public TranslationQuizExerciseController(TranslationQuizExerciseService translationQuizExerciseService){
        this.translationQuizExerciseService = translationQuizExerciseService;
    }

    @GetMapping("/translation-quiz/{exercise_id}")
    public ResponseEntity<TranslationQuizExerciseDto> getTranslationQuizData(@PathVariable Long exercise_id){
        return new ResponseEntity<>(translationQuizExerciseService.getTranslationQuizData(exercise_id), HttpStatus.OK);
    }
}
