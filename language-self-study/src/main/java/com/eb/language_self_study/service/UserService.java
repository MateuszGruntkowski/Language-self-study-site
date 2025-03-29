package com.eb.language_self_study.service;

import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.repository.UserRepository;
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

@Service
public class UserService {

    private UserRepository userRepository;
    private JwtService jwtService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
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

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public String verify(User user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "User not authenticated";
    }

    public List<HashMap<String, Object>> getTopUsers() {
        List<Object[]> topUsers = userRepository.findTop10Users();
        List<HashMap<String, Object>> topUsersList = new ArrayList<>();

        for (Object[] user : topUsers) {
            HashMap<String, Object> userMap = new HashMap<>();
            userMap.put("user_id", user[0]);
            userMap.put("username", user[1]);
            userMap.put("total_xp", user[2]);
            topUsersList.add(userMap);
        }

        return topUsersList;
    }

    public ResponseEntity<User> getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
