# Language self-study site

## Overview

Language Learning App is a web-based platform designed to help users learn English through interactive lessons, exercises, and flashcards. The application tracks user progress, awards experience points (XP) for completed activities, and features a leaderboard to encourage friendly competition.

## Features

- **Thematic Lessons**: Various categories like transportation, business, restaurant, etc.
- **Multiple Exercise Types**:
  - **Listen and Repeat**: Audio-based pronunciation practice
  - **Sentence Arrangement**: Rearranging words to form correct sentences
  - **Translation Quiz**: Multiple-choice questions testing vocabulary
- **Progress Tracking**: Save completed lessons and exercise attempts
- **Custom Flashcards**: Users can create and review their own flashcards
- **XP System**: Earn points for completing exercises and lessons
- **Leaderboard**: Rank users based on accumulated XP

## Technology Stack

- **Backend**: Spring Boot, Hibernate
- **Frontend**: React
- **Database**: MySQL

## Project Structure

```
language-learning-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── languagelearning/
│   │   │           ├── LanguageLearningApplication.java
│   │   │           ├── config/
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   └── WebConfig.java
│   │   │           ├── controller/
│   │   │           │   ├── UserController.java
│   │   │           │   ├── LessonController.java
│   │   │           │   ├── ExerciseController.java
│   │   │           │   ├── FlashcardController.java
│   │   │           │   ├── LeaderboardController.java
│   │   │           │   └── UserProgressController.java
│   │   │           ├── model/
│   │   │           │   ├── User.java
│   │   │           │   ├── UserStatistics.java
│   │   │           │   ├── UserSession.java
│   │   │           │   ├── Lesson.java
│   │   │           │   ├── Exercise.java
│   │   │           │   ├── ListenAndRepeatExercise.java
│   │   │           │   ├── SentenceArrangementExercise.java
│   │   │           │   ├── TranslationQuizExercise.java
│   │   │           │   ├── Flashcard.java
│   │   │           │   ├── UserLessonProgress.java
│   │   │           │   ├── UserExerciseAttempt.java
│   │   │           │   ├── Leaderboard.java
│   │   │           │   └── LeaderboardEntry.java
│   │   │           ├── repository/
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── UserStatisticsRepository.java
│   │   │           │   ├── UserSessionRepository.java
│   │   │           │   ├── LessonRepository.java
│   │   │           │   ├── ExerciseRepository.java
│   │   │           │   ├── FlashcardRepository.java
│   │   │           │   ├── UserLessonProgressRepository.java
│   │   │           │   ├── UserExerciseAttemptRepository.java
│   │   │           │   └── LeaderboardRepository.java
│   │   │           ├── service/
│   │   │           │   ├── UserService.java
│   │   │           │   ├── LessonService.java
│   │   │           │   ├── ExerciseService.java
│   │   │           │   ├── FlashcardService.java
│   │   │           │   ├── LeaderboardService.java
│   │   │           │   ├── UserProgressService.java
│   │   │           │   └── UserStatisticsService.java
│   │   │           ├── dto/
│   │   │           │   ├── UserDTO.java
│   │   │           │   ├── LessonDTO.java
│   │   │           │   ├── ExerciseDTO.java
│   │   │           │   ├── FlashcardDTO.java
│   │   │           │   ├── UserProgressDTO.java
│   │   │           │   └── LeaderboardDTO.java
│   │   │           ├── exception/
│   │   │           │   ├── ResourceNotFoundException.java
│   │   │           │   ├── BadRequestException.java
│   │   │           │   └── GlobalExceptionHandler.java
│   │   │           └── util/
│   │   │               └── XpCalculator.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       └── static/
│   │           └── audio/
│   └── test/
│       └── java/
│           └── com/
│               └── languagelearning/
│                   ├── controller/
│                   ├── service/
│                   └── repository/
├── pom.xml
└── README.md
```

## REST API Endpoints

### User Management

- `POST /api/users` - Register a new user
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user information
- `GET /api/users/{id}/statistics` - Get user statistics
- `GET /api/users/{id}/sessions` - Get user session history

### Lessons

- `GET /api/lessons` - Get all available lessons
- `GET /api/lessons/{id}` - Get details of a specific lesson
- `GET /api/lessons/{id}/exercises` - Get exercises for a specific lesson

### Exercises

- `GET /api/exercises/{id}` - Get details of a specific exercise
- `POST /api/exercises/{id}/attempt` - Submit an exercise attempt

### Flashcards

- `GET /api/users/{id}/flashcards` - Get user's flashcards
- `POST /api/users/{id}/flashcards` - Create a new flashcard
- `PUT /api/users/{id}/flashcards/{flashcardId}` - Update a flashcard
- `DELETE /api/users/{id}/flashcards/{flashcardId}` - Delete a flashcard

### Progress Tracking

- `GET /api/users/{id}/progress` - Get overall user progress
- `GET /api/users/{id}/lessons/{lessonId}/progress` - Get progress for a specific lesson
- `POST /api/users/{id}/lessons/{lessonId}/start` - Start a lesson
- `POST /api/users/{id}/lessons/{lessonId}/complete` - Mark a lesson as completed

### Leaderboard

- `GET /api/leaderboard` - Get top users on the leaderboard
- `GET /api/leaderboard/rank/{userId}` - Get ranking for a specific user

## Database Entities

The database schema includes the following main entities:

- User
- UserStatistics
- UserSession
- Lesson
- Exercise (with subtypes: ListenAndRepeatExercise, SentenceArrangementExercise, TranslationQuizExercise)
- Flashcard
- UserLessonProgress
- UserExerciseAttempt
- Leaderboard and LeaderboardEntry

## Setup and Installation

1. Clone the repository
2. Configure MySQL database connection in `application.properties`
3. Run `mvn install` to build the application
4. Run `mvn spring-boot:run` to start the backend server
5. Access the API at `http://localhost:8080/api`

## Development

### Backend Development

1. Create entity models based on the provided class diagram
2. Implement repositories using Spring Data JPA
3. Develop service layer for business logic
4. Create REST controllers for API endpoints
5. Configure security settings

### Testing

- Write unit tests for services and repositories
- Write integration tests for controllers
- Use tools like Postman for manual API testing
