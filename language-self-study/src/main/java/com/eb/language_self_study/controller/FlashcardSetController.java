package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.FlashcardSet;
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

    @GetMapping("/flashcard-sets/{user_id}")
    public ResponseEntity<List<FlashcardSet>> getFlashcardSetsByUser(@PathVariable Long user_id){

        List<FlashcardSet> flashcardSets = flashcardSetService.findByUserId(user_id);
        return new ResponseEntity<>(flashcardSets, HttpStatus.OK);
    }

    @PostMapping("/flashcard-sets")
    public ResponseEntity<FlashcardSet> createFlashcardSet(@RequestBody FlashcardSet flashcardSet){
        if (flashcardSet == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(flashcardSetService.createFlashcardSet(flashcardSet), HttpStatus.CREATED);

    }

    @DeleteMapping("/flashcard-sets/{flashcardSetId}")
    public ResponseEntity<Void> deleteFlashcardSet(@PathVariable Long flashcardSetId){
        if (!flashcardSetService.isExists(flashcardSetId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        flashcardSetService.deleteFlashcardSet(flashcardSetId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/flashcard-sets/{flashcardSetId}")
    public ResponseEntity<FlashcardSet> updateFlashcardSet(
            @RequestBody FlashcardSet flashcardSet,
            @PathVariable Long flashcardSetId){

        if(!flashcardSetService.isExists(flashcardSetId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        flashcardSet.setFlashcardSetId(flashcardSetId);
        return new ResponseEntity<>(flashcardSetService.updateFlashcardSet(flashcardSet), HttpStatus.OK);
    }

}
