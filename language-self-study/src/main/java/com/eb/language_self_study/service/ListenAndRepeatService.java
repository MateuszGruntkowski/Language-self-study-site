package com.eb.language_self_study.service;

import com.eb.language_self_study.model.Exercise;
import com.eb.language_self_study.model.ListenAndRepeatExercise;
import com.eb.language_self_study.model.dto.ListenAndRepeatExerciseDto;
import com.eb.language_self_study.repository.ExerciseRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ListenAndRepeatService {

    private final ExerciseRepository exerciseRepository;
    private ListenAndRepeatExerciseDto listenAndRepeatExerciseDto;

    public ListenAndRepeatService(ExerciseRepository exerciseRepository, ListenAndRepeatExerciseDto listenAndRepeatExerciseDto) {
        this.exerciseRepository = exerciseRepository;
        this.listenAndRepeatExerciseDto = listenAndRepeatExerciseDto;
    }

    private ListenAndRepeatExercise findById(Long exerciseId) {
        return (ListenAndRepeatExercise) exerciseRepository.findById(exerciseId).orElse(null);
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

                    if (!phoneticsArray.isEmpty()) {
                        String audioUrl = phoneticsArray.getJSONObject(0).optString("audio", "");
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

        listenAndRepeatExerciseDto.setExercise_id(exercise.getExercise_id());
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
}
