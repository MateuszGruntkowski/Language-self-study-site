package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.*;
import com.eb.language_self_study.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("/userProfilePic")
    public ResponseEntity<UserProfilePicDto> getUserProfilePic(Authentication authentication) {
        String username = authentication.getName();
        return new ResponseEntity<>(userService.getUserProfilePic(username), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam String userJson,
            @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) {

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            RegisterDto registerDto = objectMapper.readValue(userJson, RegisterDto.class);

            AuthResponseDto authResponseDto = userService.register(registerDto, imageFile);
            return new ResponseEntity<>(authResponseDto, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody LoginDto loginDto) {
        return userService.verify(loginDto);
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<UserLeaderboardEntryDto>> getTop10Users() {
        return new ResponseEntity<>(userService.getTopUsers(), HttpStatus.OK);
    }

    @PatchMapping("/updateProfilePic")
    public ResponseEntity<UserProfilePicDto> updateProfilePic(
            Authentication authentication,
            @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) throws IOException {

        String username = authentication.getName();
        UserProfilePicDto updatedProfilePic = userService.updateUserProfilePic(username, imageFile);
        return new ResponseEntity<>(updatedProfilePic, HttpStatus.OK);
    }

    @PatchMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @RequestBody UserDto userDto) throws IOException {

        String username = authentication.getName();

        try{
            AuthResponseDto authResponseDto = userService.updateUserProfile(username, userDto);
            return new ResponseEntity<>(authResponseDto, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
}
