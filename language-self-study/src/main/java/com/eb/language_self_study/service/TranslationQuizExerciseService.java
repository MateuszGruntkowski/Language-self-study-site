package com.eb.language_self_study.service;

import com.eb.language_self_study.model.TranslationQuizExercise;
import com.eb.language_self_study.model.dto.TranslationQuizExerciseDto;
import com.eb.language_self_study.repository.ExerciseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class TranslationQuizExerciseService {

    private ExerciseRepository exerciseRepository;
    private TranslationQuizExerciseDto translationQuizExerciseDto;
    private ObjectMapper objectMapper;

    public TranslationQuizExerciseService(
            ExerciseRepository exerciseRepository,
            TranslationQuizExerciseDto translationQuizExerciseDto,
            ObjectMapper objectMapper){

        this.exerciseRepository = exerciseRepository;
        this.translationQuizExerciseDto = translationQuizExerciseDto;
        this.objectMapper = objectMapper;
    }

    public TranslationQuizExerciseDto getTranslationQuizData(Long exercise_id) {
        TranslationQuizExercise exercise = (TranslationQuizExercise) exerciseRepository.findById(exercise_id).orElse(null);

        assert exercise != null;
        translationQuizExerciseDto.setExerciseId(exercise.getExerciseId());
        translationQuizExerciseDto.setQuestion(exercise.getQuestion());
        translationQuizExerciseDto.setCorrectOptionIndex(exercise.getCorrectOptionIndex());
        translationQuizExerciseDto.setTranslation(exercise.getTranslation());

        String[] options;
        try {
            options = objectMapper.readValue(exercise.getOptions(), String[].class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        translationQuizExerciseDto.setOptions(options);
        return translationQuizExerciseDto;
    }
}
