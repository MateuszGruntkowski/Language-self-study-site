package com.eb.language_self_study.service;

import com.eb.language_self_study.model.ListenAndRepeatExercise;
import com.eb.language_self_study.model.dto.ListenAndRepeatExerciseDto;
import com.eb.language_self_study.repository.ExerciseRepository;
import com.eb.language_self_study.repository.ListenAndRepeatExerciseRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class ListenAndRepeatService {

    private final ExerciseRepository exerciseRepository;
    private final ListenAndRepeatExerciseRepository listenAndRepeatExerciseRepository;
    private ListenAndRepeatExerciseDto listenAndRepeatExerciseDto;

    public ListenAndRepeatService(ExerciseRepository exerciseRepository, ListenAndRepeatExerciseRepository listenAndRepeatExerciseRepository, ListenAndRepeatExerciseDto listenAndRepeatExerciseDto) {
        this.exerciseRepository = exerciseRepository;
        this.listenAndRepeatExerciseRepository = listenAndRepeatExerciseRepository;
        this.listenAndRepeatExerciseDto = listenAndRepeatExerciseDto;
    }

    private ListenAndRepeatExercise findById(Long exerciseId) {
        return listenAndRepeatExerciseRepository.findById(exerciseId).orElse(null);
    }

    public String getAudioUrl(Long exerciseId) {
        ListenAndRepeatExercise exercise = findById(exerciseId);
        String textToRepeat = exercise.getTextToRepeat();

        try {
            String encodedText = URLEncoder.encode(textToRepeat, StandardCharsets.UTF_8.toString());
            String apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + encodedText;

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                JSONArray jsonArray = new JSONArray(response.getBody());
                if (!jsonArray.isEmpty()) {
                    JSONObject jsonObj = jsonArray.getJSONObject(0);
                    JSONArray phoneticsArray = jsonObj.getJSONArray("phonetics");

                    for (int i = 0; i < phoneticsArray.length(); i++) {
                        JSONObject phonetic = phoneticsArray.getJSONObject(i);
                        String audioUrl = phonetic.optString("audio", "");
                        if (!audioUrl.isEmpty()) {
                            return audioUrl;
                        }
                    }
                }
            }

            throw new RuntimeException("No audio found for: " + textToRepeat);

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Error encoding URL", e);
        } catch (JSONException e) {
            throw new RuntimeException("Error parsing JSON response", e);
        } catch (RestClientException e) {
            throw new RuntimeException("Error calling Dictionary API", e);
        }
    }

    public ListenAndRepeatExerciseDto getListenAndRepeatData(Long exerciseId) {
        ListenAndRepeatExercise exercise = findById(exerciseId);

        listenAndRepeatExerciseDto.setExerciseId(exercise.getExerciseId());
        listenAndRepeatExerciseDto.setTextToRepeat(exercise.getTextToRepeat());
        listenAndRepeatExerciseDto.setTranslation(exercise.getTranslation());

        try {
            String audioUrl = getAudioUrl(exerciseId);
            listenAndRepeatExerciseDto.setAudioUrl(audioUrl);
        } catch (Exception e) {
            listenAndRepeatExerciseDto.setAudioUrl("");
        }

        return listenAndRepeatExerciseDto;
    }

    public List<ListenAndRepeatExerciseDto> getListenAndRepeatExerciseByLessonId(Long lessonId) {
        List<ListenAndRepeatExercise> exercises = listenAndRepeatExerciseRepository.findAllByLesson_lessonId(lessonId);

        return exercises.stream()
                .map(exercise -> {
                    ListenAndRepeatExerciseDto dto = new ListenAndRepeatExerciseDto();
                    dto.setExerciseId(exercise.getExerciseId());
                    dto.setTextToRepeat(exercise.getTextToRepeat());
                    dto.setTranslation(exercise.getTranslation());
                    dto.setOrderInLesson(exercise.getOrderInLesson());
                    dto.setXpReward(exercise.getXpReward());
                    dto.setDescription(exercise.getDescription());
                    dto.setType(exercise.getType());
                    try {
                        String audioUrl = getAudioUrl(exercise.getExerciseId());
                        dto.setAudioUrl(audioUrl);
                    } catch (Exception e) {
                        dto.setAudioUrl("");
                    }
                    return dto;
                })
                .toList();
    }
}
