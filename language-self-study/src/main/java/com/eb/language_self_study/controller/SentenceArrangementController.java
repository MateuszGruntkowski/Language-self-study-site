package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.SentenceArrangementExercise;
import com.eb.language_self_study.model.dto.SentenceArrangementExerciseDto;
import com.eb.language_self_study.service.SentenceArrangementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("api/")
public class SentenceArrangementController {

    private SentenceArrangementService sentenceArrangementService;

    public SentenceArrangementController(SentenceArrangementService sentenceArrangementService){
        this.sentenceArrangementService = sentenceArrangementService;
    }


    @GetMapping("/sentence-arrangement/{exercise_id}")
    public ResponseEntity<SentenceArrangementExerciseDto> getSentenceArrangementData(@PathVariable Long exercise_id){
        return new ResponseEntity<>(sentenceArrangementService.getSentenceArrangementData(exercise_id), HttpStatus.OK);
    }
}
