package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.WorkingSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkingSetRepository extends JpaRepository<WorkingSet, Long> {
    WorkingSet findWorkingSetById(Long id);
}
