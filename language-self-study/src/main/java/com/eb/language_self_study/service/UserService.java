package com.eb.language_self_study.service;

import com.eb.language_self_study.exceptions.ResourceNotFoundException;
import com.eb.language_self_study.mappers.impl.UserMapperImpl;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.model.dto.UserLeaderboardEntryDto;
import com.eb.language_self_study.model.dto.UserProfilePicDto;
import com.eb.language_self_study.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
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

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new ResourceNotFoundException("User not found");
        }

        return userMapper.mapToDto(user);
    }

    public UserProfilePicDto getUserProfilePic(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new ResourceNotFoundException("User not found");
        }

        return new UserProfilePicDto(
                user.getProfilePicName(),
                user.getProfilePicType(),
                encodeProfilePicToBase64(user)
        );
    }

    public List<UserLeaderboardEntryDto> getTopUsers() {
        List<User> topUsers = userRepository.findTopUsersByXp(PageRequest.of(0, 10));

        return topUsers.stream()
                .map(user -> new UserLeaderboardEntryDto(
                        user.getUserId(),
                        user.getUsername(),
                        user.getUserStatistics().getTotalXp(),
                        user.getProfilePicName(),
                        user.getProfilePicType(),
                        encodeProfilePicToBase64(user)))
                .collect(Collectors.toList());
    }

    public boolean userExists(Long userId) {
        return userRepository.existsById(userId);
    }

    public String encodeProfilePicToBase64(User user){
        String base64 = null;
        byte[] imageData = user.getProfilePicData();
        if (imageData != null) {
            base64 = "data: " + user.getProfilePicType() + ";base64, " + Base64.getEncoder().encodeToString(imageData);
        }
        return base64;
    }

    public UserProfilePicDto updateUserProfilePic(String username, MultipartFile imageFile) throws IOException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            user.setProfilePicName(imageFile.getOriginalFilename());
            user.setProfilePicType(imageFile.getContentType());
            user.setProfilePicData(imageFile.getBytes());

            userRepository.save(user);
        }

        return new UserProfilePicDto(
                user.getProfilePicName(),
                user.getProfilePicType(),
                encodeProfilePicToBase64(user)
        );
    }
}
