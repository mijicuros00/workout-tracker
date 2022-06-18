package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import com.ftn.WorkoutTrackerBackend.service.ExerciseService;
import com.ftn.WorkoutTrackerBackend.service.MuscleGroupService;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/db")
public class DatabaseController {

    @Autowired
    private MuscleGroupService muscleGroupService;

    @Autowired
    private ExerciseService exerciseService;


    @GetMapping(value = "/create")
    @Transactional
    public void createDb(){

        MuscleGroup muscleGroup = new MuscleGroup(1L, "Chest");
        MuscleGroup muscleGroup2 = new MuscleGroup(2L, "Shoulders");
        MuscleGroup muscleGroup3 = new MuscleGroup(3L, "Back");
        MuscleGroup muscleGroup4 = new MuscleGroup(4L, "Triceps");
        MuscleGroup muscleGroup5 = new MuscleGroup(5L, "Biceps");
        MuscleGroup muscleGroup6 = new MuscleGroup(6L, "Legs");
        MuscleGroup muscleGroup7 = new MuscleGroup(7L, "Abs");

        muscleGroupService.save(muscleGroup);
        muscleGroupService.save(muscleGroup2);
        muscleGroupService.save(muscleGroup3);
        muscleGroupService.save(muscleGroup4);
        muscleGroupService.save(muscleGroup5);
        muscleGroupService.save(muscleGroup6);
        muscleGroupService.save(muscleGroup7);


        List<MuscleGroup> muscleGroupList = new ArrayList<>();
        muscleGroupList.add(muscleGroup);
        muscleGroupList.add(muscleGroup2);
        muscleGroupList.add(muscleGroup4);

        List<MuscleGroup> muscleGroupList2 = new ArrayList<>();
        muscleGroupList2.add(muscleGroup6);

        List<MuscleGroup> muscleGroupList3 = new ArrayList<>();
        muscleGroupList3.add(muscleGroup5);

        List<MuscleGroup> muscleGroupList4 = new ArrayList<>();
        muscleGroupList4.add(muscleGroup4);

        Exercise exercise = new Exercise(1L, "Bench press", "Bring bar down to your chest and then press it up.", null, muscleGroupList);
        Exercise exercise2 = new Exercise(2L, "Pushup", "Lower your body to the ground and then lift it up.", null, muscleGroupList);
        Exercise exercise3 = new Exercise(3L, "Back squat", "Put bar on your shoulders. Squat to at least 90 degrees angle and then stand up.", null, muscleGroupList2);
        Exercise exercise4 = new Exercise(4L, "Front squat", "Put bar on your shoulders in front of your head. Squat to at least 90 degrees angle and then stand up.", null, muscleGroupList2);
        Exercise exercise5 = new Exercise(5L, "Biceps curl", "From neutral position curl the bar up with the full range of motion and then slowly lower it down.", null, muscleGroupList3);
        Exercise exercise6 = new Exercise(6L, "Triceps pushdown", "Push the cables down using your triceps and keep your elbows fixed during the motion.", null, muscleGroupList4);

        exerciseService.save(exercise);
        exerciseService.save(exercise2);
        exerciseService.save(exercise3);
        exerciseService.save(exercise4);
        exerciseService.save(exercise5);
        exerciseService.save(exercise6);
    }

    @GetMapping(value = "/hello")
    public String hello(){
        return "Hello world";
    }
}
