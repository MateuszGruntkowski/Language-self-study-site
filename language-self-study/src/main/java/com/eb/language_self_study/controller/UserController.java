package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.model.dto.UserLeaderboardEntryDto;
import com.eb.language_self_study.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/userProfile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication) {
        String username = authentication.getName();
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam String userJson,
            @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) {

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(userJson, User.class);

            User registeredUser = userService.register(user, imageFile);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return userService.verify(user);
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<UserLeaderboardEntryDto>> getTop10Users() {
        return new ResponseEntity<>(userService.getTopUsers(), HttpStatus.OK);
    }

}
