package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.User;
import com.eb.language_self_study.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
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
}
