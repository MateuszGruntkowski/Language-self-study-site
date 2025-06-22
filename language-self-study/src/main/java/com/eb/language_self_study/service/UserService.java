package com.eb.language_self_study.service;

import com.eb.language_self_study.exceptions.EmailAlreadyExistsException;
import com.eb.language_self_study.exceptions.ResourceNotFoundException;
import com.eb.language_self_study.exceptions.UsernameAlreadyExistsException;
import com.eb.language_self_study.mappers.impl.UserMapperImpl;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.UserStatistics;
import com.eb.language_self_study.model.dto.*;
import com.eb.language_self_study.repository.UserRepository;
import com.eb.language_self_study.repository.UserStatisticsRepository;
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

    private final UserStatisticsRepository userStatisticsRepository;
    private UserRepository userRepository;
    private JwtService jwtService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    AuthenticationManager authenticationManager;
    private UserMapperImpl userMapper;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService,
                       UserMapperImpl userMapper, UserStatisticsRepository userStatisticsRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
        this.userStatisticsRepository = userStatisticsRepository;
    }

    public AuthResponseDto register(RegisterDto registerDto, MultipartFile imageFile) throws IOException {

        if(userRepository.existsByUsername(registerDto.getUsername())) {
            throw new UsernameAlreadyExistsException("Użytkownik o tej nazwie już istnieje");
        }
        if(userRepository.existsByEmail(registerDto.getEmail())) {
            throw new EmailAlreadyExistsException("Ten email jest już zajęty");
        }

        User user = userMapper.mapFromRegisterDto(registerDto);

        if (imageFile != null && !imageFile.isEmpty()) {
            user.setProfilePicName(imageFile.getOriginalFilename());
            user.setProfilePicType(imageFile.getContentType());
            user.setProfilePicData(imageFile.getBytes());
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        UserStatistics userStatistics = new UserStatistics();
        userStatistics.setUser(user);
        userStatisticsRepository.save(userStatistics);

        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponseDto(token,
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                "User registered successfully");
    }

    public List<UserDto> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> userMapper.mapToDto(user)).collect(Collectors.toList());
    }

    public AuthResponseDto verify(LoginDto loginDto) {

        User user = userRepository.findByUsername(loginDto.getUsername());
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        if(authentication.isAuthenticated()){
            String token = jwtService.generateToken(user.getUsername());
            return new AuthResponseDto(token,
                    user.getUserId(),
                    user.getUsername(),
                    user.getEmail(),
                    "User authenticated successfully");
        }
        return new AuthResponseDto(null, null, null, null, "Authentication failed");
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

    public AuthResponseDto updateUserProfile(String username, UserDto userDto) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        String newUsername = userDto.getUsername();
        if (newUsername != null && !newUsername.isEmpty() && !newUsername.equals(user.getUsername())) {
            if (userRepository.existsByUsername(newUsername)) {
                throw new UsernameAlreadyExistsException("Username already exists");
            }
            user.setUsername(userDto.getUsername());
        }

        if(userDto.getEmail() != null && !userDto.getEmail().isEmpty() && !userDto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                throw new EmailAlreadyExistsException("Email already exists");
            }
            user.setEmail(userDto.getEmail());
        }

        userRepository.save(user);
        String token = jwtService.generateToken(user.getUsername());

        return new AuthResponseDto(token,
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                "User profile updated successfully");
    }

    public boolean userExistsById(Long userId) {
        return userRepository.existsById(userId);
    }

    public boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

}
