package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.BodyMeasure;
import com.ftn.WorkoutTrackerBackend.entity.model.User;

import java.util.List;

public interface BodyMeasureService {
    List<BodyMeasure> findBodyMeasuresByUser(User user);
    BodyMeasure save(BodyMeasure bodyMeasure);
    List<BodyMeasure> findBodyMeasuresByNameAndUser(String name, User user);
    BodyMeasure findBodyMeasureById(Long id);
}
