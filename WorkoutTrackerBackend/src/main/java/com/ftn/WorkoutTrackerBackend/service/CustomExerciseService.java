package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.CustomExercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import com.ftn.WorkoutTrackerBackend.entity.model.User;

import java.util.List;

public interface CustomExerciseService {
    CustomExercise findCustomExerciseById(Long id);
    List<CustomExercise> findCustomExerciseByUserAndNameIsContainingAndMuscleGroupsContaining(User user, String name, MuscleGroup muscleGroup);
    List<CustomExercise> findCustomExerciseByUserAndNameIsContaining(User user, String name );
    CustomExercise save(CustomExercise exercise);
}
