package com.eb.language_self_study.service;

import com.eb.language_self_study.exceptions.ResourceNotFoundException;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.UserStatistics;
import com.eb.language_self_study.model.dto.ExerciseCompletionDto;
import com.eb.language_self_study.model.dto.UserStatisticsDto;
import com.eb.language_self_study.model.dto.XpRequestDto;
import com.eb.language_self_study.repository.UserRepository;
import com.eb.language_self_study.repository.UserStatisticsRepository;
import org.springframework.stereotype.Service;

@Service
public class UserStatisticsService {
    private final UserStatisticsRepository userStatisticsRepository;
    private final UserRepository userRepository;

    public UserStatisticsService(UserStatisticsRepository userStatisticsRepository, UserRepository userRepository) {
        this.userStatisticsRepository = userStatisticsRepository;
        this.userRepository = userRepository;
    }

    public UserStatisticsDto addXpToUser(String username, XpRequestDto xp) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        UserStatistics userStatistics = user.getUserStatistics();
        if (userStatistics == null) {
            userStatistics = new UserStatistics();
            userStatistics.setUser(user);
            user.setUserStatistics(userStatistics);
        }

        userStatistics.setTotalXp(userStatistics.getTotalXp() + xp.getXp());
        userStatisticsRepository.save(userStatistics);

        UserStatisticsDto userStatisticsDto = new UserStatisticsDto();
        userStatisticsDto.setTotalXp(userStatistics.getTotalXp());
        userStatisticsDto.setUserId(user.getUserId());

        return userStatisticsDto;
    }

    public UserStatisticsDto updateUserStatistics(String username, ExerciseCompletionDto completionDto) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        UserStatistics userStatistics = user.getUserStatistics();
        if (userStatistics == null) {
            userStatistics = new UserStatistics();
            userStatistics.setUser(user);
            user.setUserStatistics(userStatistics);
        }

        userStatistics.setCompletedExercisesCount(userStatistics.getCompletedExercisesCount() + 1);

        switch (completionDto.getExerciseType()) {
            case LISTEN_AND_REPEAT:
                userStatistics.setListenAndRepeatCount(userStatistics.getListenAndRepeatCount() + 1);
                break;
            case SENTENCE_ARRANGEMENT:
                userStatistics.setSentenceArrangementCount(userStatistics.getSentenceArrangementCount() + 1);
                break;
            case TRANSLATION_QUIZ:
                userStatistics.setTranslationQuizCount(userStatistics.getTranslationQuizCount() + 1);
                break;
            default:
                throw new IllegalArgumentException("Unknown exercise type: " + completionDto.getExerciseType());
        }

        userStatisticsRepository.save(userStatistics);

        return new UserStatisticsDto(
                user.getUserId(),
                userStatistics.getCompletedExercisesCount(),
                userStatistics.getListenAndRepeatCount(),
                userStatistics.getSentenceArrangementCount(),
                userStatistics.getTranslationQuizCount(),
                userStatistics.getTotalXp()
        );
    }
}
