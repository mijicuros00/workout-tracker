package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExerciseService {
    Exercise findExerciseById(Long id);
    Page<Exercise> findExercisesByNameIsContaining(String search, Pageable pageable);
    Page<Exercise> findExercisesByNameIsContainingAndMuscleGroupsContaining(String search, Pageable pageable, MuscleGroup muscleGroup);
    Exercise save(Exercise exercise);
}
