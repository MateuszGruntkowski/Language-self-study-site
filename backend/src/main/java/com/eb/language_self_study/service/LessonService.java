package com.eb.language_self_study.service;

import com.eb.language_self_study.exceptions.ResourceNotFoundException;
import com.eb.language_self_study.mappers.impl.LessonMapperImpl;
import com.eb.language_self_study.model.Lesson;
import com.eb.language_self_study.model.dto.LessonDto;
import com.eb.language_self_study.model.dto.LessonWithExercisesDto;
import com.eb.language_self_study.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {

    private LessonRepository lessonRepository;
    private LessonMapperImpl lessonMapper;

    public LessonService(LessonRepository lessonRepository, LessonMapperImpl lessonMapper) {
        this.lessonRepository = lessonRepository;
        this.lessonMapper = lessonMapper;
    }

    public List<LessonDto> getLessons() {
        List<Lesson> lessons = lessonRepository.findAll();
        return lessons.stream()
                .map(lessonMapper::mapToDto)
                .toList();
    }

    public LessonWithExercisesDto getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));
        return lessonMapper.mapToDtoWithExercises(lesson);
    }
}
