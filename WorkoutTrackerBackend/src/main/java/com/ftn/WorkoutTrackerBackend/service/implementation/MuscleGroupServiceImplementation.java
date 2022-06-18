package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import com.ftn.WorkoutTrackerBackend.repository.MuscleGroupRepository;
import com.ftn.WorkoutTrackerBackend.service.MuscleGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MuscleGroupServiceImplementation implements MuscleGroupService {

    @Autowired
    private MuscleGroupRepository muscleGroupRepository;

    @Override
    public MuscleGroup findMuscleGroupById(Long id) {
        return muscleGroupRepository.findMuscleGroupById(id);
    }

    @Override
    public MuscleGroup save(MuscleGroup muscleGroup) {
        return muscleGroupRepository.save(muscleGroup);
    }
}
