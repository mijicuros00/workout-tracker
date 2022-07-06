package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.BodyMeasure;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.repository.BodyMeasureRepository;
import com.ftn.WorkoutTrackerBackend.service.BodyMeasureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BodyMeasureServiceImplementation implements BodyMeasureService {

    @Autowired
    private BodyMeasureRepository bodyMeasureRepository;

    @Override
    public List<BodyMeasure> findBodyMeasuresByUser(User user) {
        return bodyMeasureRepository.findBodyMeasuresByUser(user);
    }

    @Override
    public BodyMeasure save(BodyMeasure bodyMeasure) {
        return bodyMeasureRepository.save(bodyMeasure);
    }

    @Override
    public List<BodyMeasure> findBodyMeasuresByNameAndUser(String name, User user) {
        return bodyMeasureRepository.findBodyMeasuresByNameAndUser(name, user);
    }

    @Override
    public BodyMeasure findBodyMeasureById(Long id) {
        return bodyMeasureRepository.findBodyMeasureById(id);
    }
}
