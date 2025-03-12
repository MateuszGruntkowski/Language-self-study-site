# Language Study Application

A comprehensive backend system for a language self-study platform featuring vocabulary learning, sentence practice, quiz systems, and gamification elements to enhance the learning experience.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [System Architecture](#system-architecture)
- [API Documentation](#api-documentation)
- [Entity Relationships](#entity-relationships)
- [Setup Instructions](#setup-instructions)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)

## Overview

This application provides a robust backend for language learners to study vocabulary, practice with sentences, track their progress, and engage with gamification elements like achievements, levels, and learning paths. The system is designed to be scalable, maintainable, and extendable to support multiple languages and learning approaches.

## Features

### User Management
- User registration and authentication
- Profile management
- Progress tracking
- Experience points and level system

### Language Content
- Multiple language support
- Word management (creation, retrieval, updating)
- Sentence management
- Difficulty levels for content

### Learning Tools
- Study sessions with progress tracking
- Quizzes with multiple-choice questions
- Learning paths with structured content
- Spaced repetition system for vocabulary and sentences

### Gamification
- Achievement system with badges
- Experience points and leveling
- Streak tracking
- Performance statistics

### Analytics
- User learning statistics
- Progress visualization
- Time spent studying
- Mastery level tracking

## Technical Stack

- **Framework**: Spring Boot
- **ORM**: Hibernate/JPA
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Build Tool**: Maven

## System Architecture

The application follows a standard layered architecture:

1. **Controller Layer**: Handles incoming HTTP requests and routes them to the appropriate service
2. **Service Layer**: Contains business logic and application workflows
3. **Repository Layer**: Manages data access operations
4. **Entity Layer**: Defines the data model
5. **DTO Layer**: Data Transfer Objects for request/response handling
6. **Security Layer**: Handles authentication and authorization
7. **Exception Handling**: Global exception management

## API Documentation

The API is RESTful and follows these general patterns:

### User Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get JWT token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/statistics` - Get user learning statistics

### Language Endpoints
- `GET /api/languages` - Get all available languages
- `GET /api/languages/{id}` - Get a specific language

### Vocabulary Endpoints
- `GET /api/words` - Get words (with filtering options)
- `POST /api/words` - Add a new word
- `PUT /api/words/{id}` - Update a word
- `DELETE /api/words/{id}` - Delete a word
- `GET /api/words/random` - Get random words for study

### Sentence Endpoints
- `GET /api/sentences` - Get sentences (with filtering options)
- `POST /api/sentences` - Add a new sentence
- `PUT /api/sentences/{id}` - Update a sentence
- `DELETE /api/sentences/{id}` - Delete a sentence
- `GET /api/sentences/random` - Get random sentences for study

### Progress Endpoints
- `POST /api/progress/update` - Update progress for a word or sentence
- `GET /api/progress/words` - Get word learning progress
- `GET /api/progress/sentences` - Get sentence learning progress

### Study Session Endpoints
- `POST /api/study-sessions/start` - Start a new study session
- `PUT /api/study-sessions/{id}/end` - End a study session
- `GET /api/study-sessions/history` - Get study session history

### Quiz Endpoints
- `GET /api/quizzes` - Get available quizzes
- `GET /api/quizzes/{id}` - Get a specific quiz
- `POST /api/quizzes/{id}/attempt` - Start a quiz attempt
- `PUT /api/quizzes/attempts/{id}/submit` - Submit quiz answers

### Achievement Endpoints
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/user` - Get user's achievements
- `PUT /api/achievements/user/{id}/read` - Mark achievement as read

### Learning Path Endpoints
- `GET /api/learning-paths` - Get available learning paths
- `GET /api/learning-paths/{id}` - Get specific learning path details
- `PUT /api/learning-paths/{id}/steps/{stepId}/complete` - Mark step as complete

## Entity Relationships

The system has the following main entities:

- **User**: Core user information and authentication details
- **Language**: Available languages for study
- **Word**: Vocabulary items with translations
- **Sentence**: Example sentences with translations
- **UserProgress**: Tracks user's progress with words and sentences
- **StudySession**: Records of study activity
- **Achievement**: Definable accomplishments users can unlock
- **UserAchievement**: Tracks which achievements users have earned
- **Quiz**: Collections of questions on specific topics
- **QuizQuestion**: Individual questions within a quiz
- **QuizAttempt**: Record of a user's attempt at a quiz
- **LearningPath**: Structured learning sequences
- **LearningPathStep**: Individual components of a learning path
- **UserStatistics**: Aggregated statistics about user activity

## Setup Instructions

1. **Prerequisites**:
   - JDK 17+
   - Maven 3.8+
   - MySQL 8.0+

2. **Database Setup**:
   ```sql
   CREATE DATABASE language_study;
   CREATE USER 'langapp'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON language_study.* TO 'langapp'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Application Configuration**:
   - Edit `application.properties` with your database credentials
   - Configure JWT secret and expiration

4. **Build and Run**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Access the API**:
   - The API will be available at `http://localhost:8080`
   - Swagger documentation at `http://localhost:8080/swagger-ui.html`

## Development Guidelines

1. **Code Style**:
   - Follow Google Java Style Guide
   - Use meaningful variable and method names
   - Add comments for complex logic

2. **API Design**:
   - Follow REST principles
   - Use proper HTTP status codes
   - Implement validation for all inputs
   - Version APIs with `/api/v1/` prefix

3. **Security Practices**:
   - Never expose sensitive data
   - Validate all user inputs
   - Use parameterized queries
   - Implement rate limiting for public endpoints

4. **Database**:
   - Use migrations for schema changes
   - Avoid N+1 query problems
   - Index frequently queried columns

## Testing

1. **Running Tests**:
   ```bash
   mvn test                 # Run all tests
   mvn test -Dtest=UserServiceTest  # Run specific test
   ```

2. **Test Coverage**:
   ```bash
   mvn jacoco:report        # Generate coverage report
   ```

3. **Test Categories**:
   - Unit tests for services and utilities
   - Integration tests for repositories
   - Controller tests for API endpoints
   - Security tests for authentication
