package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.CustomExercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomExerciseRepository extends JpaRepository<CustomExercise, Long> {
    List<CustomExercise> findCustomExerciseByUserAndNameIsContainingAndMuscleGroupsContaining(User user, String name, MuscleGroup muscleGroup);
    List<CustomExercise> findCustomExerciseByUserAndNameIsContaining(User user, String name );
    CustomExercise findCustomExerciseById(Long id);
}
