package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.FlashcardSetDto;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.service.FlashcardSetService;
import com.eb.language_self_study.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FlashcardSetController {

    private final UserService userService;
    private FlashcardSetService flashcardSetService;

    public FlashcardSetController(FlashcardSetService flashcardSetService, UserService userService){
        this.flashcardSetService = flashcardSetService;
        this.userService = userService;
    }

//    @GetMapping("/users/{userId}/flashcard-sets")
//    public ResponseEntity<List<FlashcardSetDto>> getUserFlashcardSets(@PathVariable Long userId){
//
//        List<FlashcardSetDto> flashcardSets = flashcardSetService.getFlashcardSetsByUserId(userId);
//        return new ResponseEntity<>(flashcardSets, HttpStatus.OK);
//    }

//    @GetMapping("/users/{userId}/flashcard-sets/{setId}")
//    public ResponseEntity<FlashcardSetDto> getFlashcardSetById(
//            @PathVariable Long userId,
//            @PathVariable Long setId){
//        FlashcardSetDto flashcardSet = flashcardSetService.getFlashcardSetById(userId, setId);
//        return new ResponseEntity<>(flashcardSet, HttpStatus.OK);
//    }

//    @PostMapping("/users/{username}/flashcard-sets")
//    public ResponseEntity<FlashcardSetDto> createFlashcardSet(
//            @PathVariable String username,
//            @RequestBody FlashcardSetDto flashcardSetDto){
//        if (flashcardSetDto == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(flashcardSetService.createFlashcardSet(username, flashcardSetDto), HttpStatus.CREATED);
//
//    }

//    @DeleteMapping("/users/{userId}/flashcard-sets/{setId}")
//    public ResponseEntity<Void> deleteFlashcardSet(
//            @PathVariable Long setId,
//            @PathVariable Long userId){
//        flashcardSetService.deleteFlashcardSet(userId, setId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

//    @PutMapping("/users/{userId}/flashcard-sets/{setId}")
//    public ResponseEntity<FlashcardSetDto> updateFlashcardSet(
//            @RequestBody FlashcardSetDto flashcardSetDto,
//            @PathVariable Long setId,
//            @PathVariable Long userId){
//
//        return new ResponseEntity<>(flashcardSetService.updateFlashcardSet(userId, setId, flashcardSetDto), HttpStatus.OK);
//    }

    @GetMapping("/flashcard-sets")
    public ResponseEntity<List<FlashcardSetDto>> getUserFlashcardSets(Authentication authentication){

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();
        List<FlashcardSetDto> flashcardSets = flashcardSetService.getFlashcardSetsByUserId(userId);

        return new ResponseEntity<>(flashcardSets, HttpStatus.OK);
    }

    @GetMapping("/users//flashcard-sets/{setId}")
    public ResponseEntity<FlashcardSetDto> getFlashcardSetById(
            @PathVariable Long setId,
            Authentication authentication){

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();
        FlashcardSetDto flashcardSet = flashcardSetService.getFlashcardSetById(userId, setId);

        return new ResponseEntity<>(flashcardSet, HttpStatus.OK);
    }

    @PostMapping("/users/flashcard-sets")
    public ResponseEntity<FlashcardSetDto> createFlashcardSet(
            @RequestBody FlashcardSetDto flashcardSetDto,
            Authentication authentication){

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);

        if (flashcardSetDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(flashcardSetService.createFlashcardSet(userDto, flashcardSetDto), HttpStatus.CREATED);

    }

    @DeleteMapping("/users/flashcard-sets/{setId}")
    public ResponseEntity<Void> deleteFlashcardSet(
            @PathVariable Long setId,
            Authentication authentication){

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();
        flashcardSetService.deleteFlashcardSet(userId, setId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/users/flashcard-sets/{setId}")
    public ResponseEntity<FlashcardSetDto> updateFlashcardSet(
            @RequestBody FlashcardSetDto flashcardSetDto,
            @PathVariable Long setId,
            Authentication authentication){

        String username = authentication.getName();
        UserDto userDto = userService.getUserByUsername(username);
        Long userId = userDto.getUserId();

        if(flashcardSetDto == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(flashcardSetService.updateFlashcardSet(userId, setId, flashcardSetDto), HttpStatus.OK);
    }
}
