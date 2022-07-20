package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.dto.WorkoutDTO;
import com.ftn.WorkoutTrackerBackend.entity.mapper.PerformedExerciseMapper;
import com.ftn.WorkoutTrackerBackend.entity.mapper.WorkoutMapper;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.entity.model.Workout;
import com.ftn.WorkoutTrackerBackend.service.PerformedExerciseService;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import com.ftn.WorkoutTrackerBackend.service.WorkingSetService;
import com.ftn.WorkoutTrackerBackend.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/workouts")
public class WorkoutController {

    @Autowired
    private UserService userService;

    @Autowired
    private WorkoutService workoutService;

    @Autowired
    private PerformedExerciseService performedExerciseService;

    @Autowired
    private WorkingSetService workingSetService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<WorkoutDTO>> getAllUsersWorkouts(){
        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Workout> workouts = workoutService.findWorkoutsByUser(user);

        return new ResponseEntity<>(WorkoutMapper.mapListToDTO(workouts), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<WorkoutDTO> getOne(@PathVariable Long id){
        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Workout workout = workoutService.findWorkoutById(id);
        if(!workout.getUser().equals(user)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(WorkoutMapper.mapDTO(workout), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    @Transactional
    public ResponseEntity<Long> createWorkout(@RequestBody WorkoutDTO workoutDTO){
        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Workout workout = WorkoutMapper.mapModel(workoutDTO);

        workout.setUser(user);

        Workout createdWorkout = workoutService.save(workout);

        return new ResponseEntity<>(createdWorkout.getId(), HttpStatus.CREATED);

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping(value = "/{id}")
    @Transactional
    public ResponseEntity<WorkoutDTO> updateWorkout(@PathVariable Long id, @RequestBody WorkoutDTO workoutDTO){
        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Workout workout = workoutService.findWorkoutById(id);

        if(workout == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if(!workout.getUser().equals(user)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        workout.setDateOfWorkout(workoutDTO.getDateOfWorkout());
        workout.setPerformedExercises(PerformedExerciseMapper.mapDTOListToModel(workoutDTO.getPerformedExercises()));

        workoutService.save(workout);

        return new ResponseEntity<>(WorkoutMapper.mapDTO(workout), HttpStatus.OK);

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @Transactional
    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteWorkout(@PathVariable Long id){

        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try{
            workoutService.deleteWorkoutById(id);
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
