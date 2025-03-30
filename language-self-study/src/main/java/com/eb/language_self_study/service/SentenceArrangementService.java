package com.eb.language_self_study.service;

import com.eb.language_self_study.model.SentenceArrangementExercise;
import com.eb.language_self_study.model.dto.SentenceArrangementExerciseDto;
import com.eb.language_self_study.repository.ExerciseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class SentenceArrangementService {

    private ExerciseRepository exerciseRepository;
    private SentenceArrangementExerciseDto sentenceArrangementExerciseDto;

    public SentenceArrangementService(ExerciseRepository exerciseRepository, SentenceArrangementExerciseDto sentenceArrangementExerciseDto){
        this.exerciseRepository = exerciseRepository;
        this.sentenceArrangementExerciseDto = sentenceArrangementExerciseDto;
    }

    public SentenceArrangementExerciseDto getSentenceArrangementData(Long exercise_id) {
        SentenceArrangementExercise exercise =
                (SentenceArrangementExercise) exerciseRepository.findById(exercise_id).orElse(null);

        assert exercise != null;
        sentenceArrangementExerciseDto.setExerciseId(exercise.getExerciseId());
        sentenceArrangementExerciseDto.setCorrectSentence(exercise.getCorrectSentence());
        sentenceArrangementExerciseDto.setTranslation(exercise.getTranslation());

        ObjectMapper objectMapper = new ObjectMapper();

        String[] wordOptions;
        try {
            wordOptions = objectMapper.readValue(exercise.getWordOptions(), String[].class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        sentenceArrangementExerciseDto.setWordOptions(wordOptions);

        return sentenceArrangementExerciseDto;
    }
}
