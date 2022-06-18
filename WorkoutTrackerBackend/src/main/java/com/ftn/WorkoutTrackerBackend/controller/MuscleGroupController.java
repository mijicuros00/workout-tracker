package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import com.ftn.WorkoutTrackerBackend.service.MuscleGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/muscle-groups")
public class MuscleGroupController {

    @Autowired
    private MuscleGroupService muscleGroupService;

    @GetMapping
    public ResponseEntity<List<MuscleGroup>> getAll(){
        return new ResponseEntity<>(muscleGroupService.findAll(), HttpStatus.OK);
    }
}
