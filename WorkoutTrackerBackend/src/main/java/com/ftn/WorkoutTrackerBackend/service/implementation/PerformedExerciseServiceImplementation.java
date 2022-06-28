package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.PerformedExercise;
import com.ftn.WorkoutTrackerBackend.repository.PerformedExerciseRepository;
import com.ftn.WorkoutTrackerBackend.service.PerformedExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PerformedExerciseServiceImplementation implements PerformedExerciseService {

    @Autowired
    private PerformedExerciseRepository performedExerciseRepository;

    @Override
    public PerformedExercise findPerformedExerciseById(Long id) {
        return performedExerciseRepository.findPerformedExerciseById(id);
    }

    @Override
    public PerformedExercise save(PerformedExercise exercise) {
        return performedExerciseRepository.save(exercise);
    }
}
