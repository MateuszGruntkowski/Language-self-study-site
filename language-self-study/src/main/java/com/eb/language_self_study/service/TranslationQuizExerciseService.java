package com.eb.language_self_study.service;

import com.eb.language_self_study.model.TranslationQuizExercise;
import com.eb.language_self_study.model.dto.TranslationQuizExerciseDto;
import com.eb.language_self_study.repository.ExerciseRepository;
import com.eb.language_self_study.repository.TranslationQuizExerciseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TranslationQuizExerciseService {

     private TranslationQuizExerciseRepository translationQuizExerciseRepository;
    private TranslationQuizExerciseDto translationQuizExerciseDto;
    private ObjectMapper objectMapper;

    public TranslationQuizExerciseService(
            TranslationQuizExerciseRepository translationQuizExerciseRepository,
            TranslationQuizExerciseDto translationQuizExerciseDto,
            ObjectMapper objectMapper){

        this.translationQuizExerciseRepository = translationQuizExerciseRepository;
        this.translationQuizExerciseDto = translationQuizExerciseDto;
        this.objectMapper = objectMapper;
    }

    public TranslationQuizExerciseDto getTranslationQuizData(Long exercise_id) {
        TranslationQuizExercise exercise = translationQuizExerciseRepository.findById(exercise_id).orElse(null);

        assert exercise != null;
        return mapToDto(exercise, translationQuizExerciseDto);
    }

    private TranslationQuizExerciseDto mapToDto(TranslationQuizExercise exercise, TranslationQuizExerciseDto translationQuizExerciseDto) {
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

    public List<TranslationQuizExerciseDto> getTranslationQuizExerciseByLessonId(Long lessonId) {
        List<TranslationQuizExercise> exercises = translationQuizExerciseRepository.findAllByLesson_lessonId(lessonId);

        List<TranslationQuizExerciseDto> exerciseDtos = exercises.stream()
                .map(exercise -> {
                    TranslationQuizExerciseDto dto = new TranslationQuizExerciseDto();
                    return mapToDto(exercise, dto);
                })
                .toList();

        return exerciseDtos;
    }
}
