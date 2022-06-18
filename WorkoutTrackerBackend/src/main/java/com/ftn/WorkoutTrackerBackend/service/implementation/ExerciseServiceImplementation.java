package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import com.ftn.WorkoutTrackerBackend.repository.ExerciseRepository;
import com.ftn.WorkoutTrackerBackend.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServiceImplementation implements ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public Exercise findExerciseById(Long id) {
        return exerciseRepository.findExerciseById(id);
    }

    @Override
    public Page<Exercise> findExercisesByNameIsContaining(String search, Pageable pageable) {
        return exerciseRepository.findExercisesByNameIsContaining(search, pageable);
    }

    @Override
    public Page<Exercise> findExercisesByNameIsContainingAndMuscleGroupsContaining(String search, Pageable pageable, MuscleGroup muscleGroup) {
        return exerciseRepository.findExercisesByNameIsContainingAndMuscleGroupsContaining(search, pageable, muscleGroup);
    }

    @Override
    public Exercise save(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }
}
