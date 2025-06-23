package com.eb.language_self_study.mappers.impl;

import com.eb.language_self_study.mappers.Mapper;
import com.eb.language_self_study.model.Lesson;
import com.eb.language_self_study.model.dto.ExerciseDto;
import com.eb.language_self_study.model.dto.LessonDto;
import com.eb.language_self_study.model.dto.LessonWithExercisesDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class LessonMapperImpl implements Mapper<LessonDto, Lesson> {

    ModelMapper modelMapper;

    public LessonMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public LessonDto mapToDto(Lesson lesson) {
        return modelMapper.map(lesson, LessonDto.class);
    }

    @Override
    public Lesson mapFromDto(LessonDto lessonDto) {
        return modelMapper.map(lessonDto, Lesson.class);
    }

    public LessonWithExercisesDto mapToDtoWithExercises(Lesson lesson) {
        return modelMapper.map(lesson, LessonWithExercisesDto.class);
    }

    public Lesson mapFromDtoWithExercises(LessonWithExercisesDto lessonWithExercisesDto) {
        return modelMapper.map(lessonWithExercisesDto, Lesson.class);
    }
}
