package com.eb.language_self_study.controller;

import com.eb.language_self_study.model.dto.*;
import com.eb.language_self_study.service.UserService;
import com.eb.language_self_study.service.UserStatisticsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/api")
public class UserStatisticsController {

    private final UserStatisticsService userStatisticsService;
    public UserStatisticsController(UserStatisticsService userStatisticsService) {
        this.userStatisticsService = userStatisticsService;
    }

    @PatchMapping("/user-statistics/add-xp")
    public ResponseEntity<UserStatisticsDto> addXpToUser(
            Authentication authentication,
            @RequestBody XpRequestDto xp) {

        String username = authentication.getName();
        UserStatisticsDto updatedStatistics = userStatisticsService.addXpToUser(username, xp);
        return new ResponseEntity<>(updatedStatistics, HttpStatus.OK);
    }

    @PatchMapping("/user-statistics/update-statistics")
    public ResponseEntity<UserStatisticsDto> updateStatistics(
            Authentication authentication,
            @RequestBody ExerciseCompletionDto completionDto) {

        String username = authentication.getName();
        UserStatisticsDto updatedStatistics = userStatisticsService.updateUserStatistics(username, completionDto);
        return new ResponseEntity<>(updatedStatistics, HttpStatus.OK);
    }

}
