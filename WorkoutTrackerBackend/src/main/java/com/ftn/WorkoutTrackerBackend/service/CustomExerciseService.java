package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.CustomExercise;
import com.ftn.WorkoutTrackerBackend.entity.model.User;

import java.util.List;

public interface CustomExerciseService {
    CustomExercise findCustomExerciseById(Long id);
    List<CustomExercise> findCustomExerciseByUser(User user);
    CustomExercise save(CustomExercise exercise);
}
