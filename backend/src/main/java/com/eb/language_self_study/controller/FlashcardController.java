package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.dto.FlashcardDto;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.service.FlashcardService;
import com.eb.language_self_study.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FlashcardController {

    // DOPISAC OBSLUGE GDY NIE MA BODY DLA Create I Update!
    private FlashcardService flashcardService;
    private UserService userService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
        this.userService = userService;
    }

//    @GetMapping("users/{userId}/flashcard-sets/{setId}/flashcards")
//    public ResponseEntity<List<FlashcardDto>> getFlashcardsBySetId(
//            @PathVariable Long setId,
//            @PathVariable Long userId) {
//
//        return new ResponseEntity<>(flashcardService.getFlashcardsBySetId(userId, setId), HttpStatus.OK);
//    }

//    @GetMapping("users/{userId}/flashcard-sets/{setId}/flashcards/{flashcardId}")
//    public ResponseEntity<FlashcardDto> getFlashcardById(
//            @PathVariable Long flashcardId,
//            @PathVariable Long userId,
//            @PathVariable Long setId) {
//        return new ResponseEntity<>(flashcardService.getFlashcardById(userId, setId, flashcardId), HttpStatus.OK);
//    }

//    @PostMapping("users/{userId}/flashcard-sets/{setId}/flashcards")
//    public ResponseEntity<FlashcardDto> createFlashcard(
//            @PathVariable Long userId,
//            @PathVariable Long setId,
//            @RequestBody FlashcardDto flashcardDto) {
//        if (flashcardDto == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(flashcardService.createFlashcard(userId, setId, flashcardDto), HttpStatus.CREATED);
//    }

//    @PutMapping("users/{userId}/flashcard-sets/{setId}/flashcards/{flashcardId}")
//    public ResponseEntity<FlashcardDto> updateFlashcard(
//            @PathVariable Long flashcardId,
//            @PathVariable Long userId,
//            @PathVariable Long setId,
//            @RequestBody FlashcardDto flashcardDto) {
//        return new ResponseEntity<>(flashcardService.updateFlashcard(userId, setId, flashcardId, flashcardDto), HttpStatus.OK);
//    }

//    @DeleteMapping("users/{userId}/flashcard-sets/{setId}/flashcards/{flashcardId}")
//    public ResponseEntity<Void> deleteFlashcard(
//            @PathVariable Long flashcardId,
//            @PathVariable Long userId,
//            @PathVariable Long setId) {
//        flashcardService.deleteFlashcard(userId, setId, flashcardId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
// ------------------------------------------------------------------------------------------------------------
    @GetMapping("/flashcard-sets/{setId}/flashcards")
    public ResponseEntity<List<FlashcardDto>> getFlashcardsBySetId(
            @PathVariable Long setId,
            Authentication authentication) {

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();

        return new ResponseEntity<>(flashcardService.getFlashcardsBySetId(userId, setId), HttpStatus.OK);
    }

    @GetMapping("/flashcard-sets/{setId}/flashcards/{flashcardId}")
    public ResponseEntity<FlashcardDto> getFlashcardById(
            @PathVariable Long flashcardId,
            @PathVariable Long setId,
            Authentication authentication) {

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();

        return new ResponseEntity<>(flashcardService.getFlashcardById(userId, setId, flashcardId), HttpStatus.OK);
    }

    @PostMapping("/flashcard-sets/{setId}/flashcards")
    public ResponseEntity<FlashcardDto> createFlashcard(
            @PathVariable Long setId,
            @Valid @RequestBody FlashcardDto flashcardDto,
            Authentication authentication) {

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();

        return new ResponseEntity<>(flashcardService.createFlashcard(userId, setId, flashcardDto), HttpStatus.CREATED);
    }

    @PutMapping("/flashcard-sets/{setId}/flashcards/{flashcardId}")
    public ResponseEntity<FlashcardDto> updateFlashcard(
            @PathVariable Long flashcardId,
            @PathVariable Long setId,
            @Valid @RequestBody FlashcardDto flashcardDto,
            Authentication authentication) {

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();

        return new ResponseEntity<>(flashcardService.updateFlashcard(userId, setId, flashcardId, flashcardDto), HttpStatus.OK);
    }

    @DeleteMapping("/flashcard-sets/{setId}/flashcards/{flashcardId}")
    public ResponseEntity<Void> deleteFlashcard(
            @PathVariable Long flashcardId,
            @PathVariable Long setId,
            Authentication authentication) {

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();

        flashcardService.deleteFlashcard(userId, setId, flashcardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
