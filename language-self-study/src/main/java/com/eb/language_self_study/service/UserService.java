package com.eb.language_self_study.service;

import com.eb.language_self_study.mappers.impl.UserMapperImpl;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.model.dto.UserLeaderboardEntryDto;
import com.eb.language_self_study.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;
    private JwtService jwtService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    AuthenticationManager authenticationManager;
    private UserMapperImpl userMapper;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService,
                       UserMapperImpl userMapper) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
    }

    public User register(User user, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            user.setProfilePicName(imageFile.getOriginalFilename());
            user.setProfilePicType(imageFile.getContentType());
            user.setProfilePicData(imageFile.getBytes());
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<UserDto> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> userMapper.mapToDto(user)).collect(Collectors.toList());
    }

    public String verify(User user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "User not authenticated";
    }

    public ResponseEntity<UserDto> getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        UserDto userDto = userMapper.mapToDto(user);

        if (user != null) {
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public List<UserLeaderboardEntryDto> getTopUsers() {
        List<User> topUsers = userRepository.findTopUsersByXp(PageRequest.of(0, 10));

        return topUsers.stream()
                .map(user -> new UserLeaderboardEntryDto(
                        user.getUser_id(),
                        user.getUsername(),
                        user.getUserStatistics().getTotalXp()))
                .collect(Collectors.toList());
    }
}
