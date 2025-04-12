package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.model.dto.FlashcardSetDto;
import com.eb.language_self_study.service.FlashcardSetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FlashcardSetController {

    private FlashcardSetService flashcardSetService;

    public FlashcardSetController(FlashcardSetService flashcardSetService){
        this.flashcardSetService = flashcardSetService;
    }

    @GetMapping("/users/{userId}/flashcard-sets")
    public ResponseEntity<List<FlashcardSetDto>> getUserFlashcardSets(@PathVariable Long userId){

        List<FlashcardSetDto> flashcardSets = flashcardSetService.getFlashcardSetsByUserId(userId);
        return new ResponseEntity<>(flashcardSets, HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/flashcard-sets/{setId}")
    public ResponseEntity<FlashcardSetDto> getFlashcardSetById(
            @PathVariable Long userId,
            @PathVariable Long setId){
        FlashcardSetDto flashcardSet = flashcardSetService.getFlashcardSetById(userId, setId);
        return new ResponseEntity<>(flashcardSet, HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/flashcard-sets")
    public ResponseEntity<FlashcardSetDto> createFlashcardSet(
            @PathVariable Long userId,
            @RequestBody FlashcardSetDto flashcardSetDto){
        if (flashcardSetDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(flashcardSetService.createFlashcardSet(userId, flashcardSetDto), HttpStatus.CREATED);

    }

    @DeleteMapping("/users/{userId}/flashcard-sets/{setId}")
    public ResponseEntity<Void> deleteFlashcardSet(
            @PathVariable Long setId,
            @PathVariable Long userId){
        flashcardSetService.deleteFlashcardSet(userId, setId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/users/{userId}/flashcard-sets/{setId}")
    public ResponseEntity<FlashcardSetDto> updateFlashcardSet(
            @RequestBody FlashcardSetDto flashcardSetDto,
            @PathVariable Long setId,
            @PathVariable Long userId){

        return new ResponseEntity<>(flashcardSetService.updateFlashcardSet(userId, setId, flashcardSetDto), HttpStatus.OK);
    }

}
