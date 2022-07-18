package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.entity.model.Workout;
import com.ftn.WorkoutTrackerBackend.repository.WorkoutRepository;
import com.ftn.WorkoutTrackerBackend.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutServiceimplementation implements WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Override
    public List<Workout> findWorkoutsByUser(User user) {
        return workoutRepository.findWorkoutsByUser(user);
    }

    @Override
    public Workout findWorkoutById(Long id) {
        return workoutRepository.findWorkoutById(id);
    }

    @Override
    public Workout save(Workout workout) {
        return workoutRepository.save(workout);
    }

    @Override
    public Workout deleteWorkoutById(Long id) {
        return workoutRepository.deleteWorkoutById(id);
    }
}
