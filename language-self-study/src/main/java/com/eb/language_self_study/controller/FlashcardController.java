package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.dto.FlashcardDto;
import com.eb.language_self_study.service.FlashcardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FlashcardController {

    private FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @GetMapping("users/{userId}/flashcard-sets/{setId}/flashcards")
    public ResponseEntity<List<FlashcardDto>> getFlashcardsBySetId(
            @PathVariable Long setId,
            @PathVariable Long userId) {

        return new ResponseEntity<>(flashcardService.getFlashcardsBySetId(userId, setId), HttpStatus.OK);
    }

    @GetMapping("users/{userId}/flashcard-sets/{setId}/flashcards/{flashcardId}")
    public ResponseEntity<FlashcardDto> getFlashcardById(
            @PathVariable Long flashcardId,
            @PathVariable Long userId,
            @PathVariable Long setId) {
        return new ResponseEntity<>(flashcardService.getFlashcardById(userId, setId, flashcardId), HttpStatus.OK);
    }

    @PostMapping("users/{userId}/flashcard-sets/{setId}/flashcards")
    public ResponseEntity<FlashcardDto> createFlashcard(
            @PathVariable Long userId,
            @PathVariable Long setId,
            @RequestBody FlashcardDto flashcardDto) {
        if (flashcardDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(flashcardService.createFlashcard(userId, setId, flashcardDto), HttpStatus.CREATED);
    }

    @PutMapping("users/{userId}/flashcard-sets/{setId}/flashcards/{flashcardId}")
    public ResponseEntity<FlashcardDto> updateFlashcard(
            @PathVariable Long flashcardId,
            @PathVariable Long userId,
            @PathVariable Long setId,
            @RequestBody FlashcardDto flashcardDto) {
        return new ResponseEntity<>(flashcardService.updateFlashcard(userId, setId, flashcardId, flashcardDto), HttpStatus.OK);
    }

    @DeleteMapping("users/{userId}/flashcard-sets/{setId}/flashcards/{flashcardId}")
    public ResponseEntity<Void> deleteFlashcard(
            @PathVariable Long flashcardId,
            @PathVariable Long userId,
            @PathVariable Long setId) {
        flashcardService.deleteFlashcard(userId, setId, flashcardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
