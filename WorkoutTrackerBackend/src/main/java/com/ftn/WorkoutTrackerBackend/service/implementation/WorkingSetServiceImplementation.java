package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.WorkingSet;
import com.ftn.WorkoutTrackerBackend.repository.WorkingSetRepository;
import com.ftn.WorkoutTrackerBackend.service.WorkingSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkingSetServiceImplementation implements WorkingSetService {

    @Autowired
    private WorkingSetRepository workingSetRepository;

    @Override
    public WorkingSet findWorkingSetById(Long id) {
        return workingSetRepository.findWorkingSetById(id);
    }

    @Override
    public WorkingSet save(WorkingSet workingSet) {
        return workingSetRepository.save(workingSet);
    }
}
