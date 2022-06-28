package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.WorkingSet;

public interface WorkingSetService {
    WorkingSet findWorkingSetById(Long id);
    WorkingSet save(WorkingSet workingSet);
}
