package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.BodyMeasure;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BodyMeasureRepository extends JpaRepository<BodyMeasure, Long> {
    List<BodyMeasure> findBodyMeasuresByUser(User user);
    List<BodyMeasure> findBodyMeasuresByNameAndUser(String name, User user);
    BodyMeasure findBodyMeasureById(Long id);
}
