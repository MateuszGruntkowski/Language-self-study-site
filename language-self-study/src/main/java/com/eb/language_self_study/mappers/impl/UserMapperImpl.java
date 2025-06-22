package com.eb.language_self_study.mappers.impl;

import com.eb.language_self_study.mappers.Mapper;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.RegisterDto;
import com.eb.language_self_study.model.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements Mapper<UserDto, User> {

    ModelMapper modelMapper;
    public UserMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto mapToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public User mapFromDto(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    public User mapFromRegisterDto(RegisterDto registerDto) {
        return modelMapper.map(registerDto, User.class);
    }
}
