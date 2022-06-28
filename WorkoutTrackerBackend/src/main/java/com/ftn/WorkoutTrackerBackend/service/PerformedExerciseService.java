package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.PerformedExercise;

public interface PerformedExerciseService {
    PerformedExercise findPerformedExerciseById(Long id);
    PerformedExercise save(PerformedExercise exercise);
}
