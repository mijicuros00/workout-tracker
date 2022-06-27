package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.CustomExercise;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.repository.CustomExerciseRepository;
import com.ftn.WorkoutTrackerBackend.service.CustomExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomExerciseServiceImplementation implements CustomExerciseService {

    @Autowired
    private CustomExerciseRepository customExerciseRepository;

    @Override
    public CustomExercise findCustomExerciseById(Long id) {
        return customExerciseRepository.findCustomExerciseById(id);
    }

    @Override
    public List<CustomExercise> findCustomExerciseByUser(User user) {
        return customExerciseRepository.findCustomExerciseByUser(user);
    }

    @Override
    public CustomExercise save(CustomExercise exercise) {
        return customExerciseRepository.save(exercise);
    }
}
