package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.dto.ExerciseDTO;
import com.ftn.WorkoutTrackerBackend.entity.dto.ExerciseRequestDTO;
import com.ftn.WorkoutTrackerBackend.entity.mapper.ExerciseMapper;
import com.ftn.WorkoutTrackerBackend.entity.model.*;
import com.ftn.WorkoutTrackerBackend.service.CustomExerciseService;
import com.ftn.WorkoutTrackerBackend.service.ExerciseService;
import com.ftn.WorkoutTrackerBackend.service.MuscleGroupService;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private CustomExerciseService customExerciseService;

    @Autowired
    private MuscleGroupService muscleGroupService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getAll(Pageable pageable, @RequestParam(value = "search", defaultValue = "") String search, @RequestParam(required = false) Long muscleGroupId){

        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Page<Exercise> exercises = null;
        
        if(muscleGroupId == 0){
            exercises = exerciseService.findExercisesByNameIsContaining(search, pageable);
        }else{
            MuscleGroup muscleGroup = muscleGroupService.findMuscleGroupById(muscleGroupId);
            if(muscleGroup != null){
                exercises = exerciseService.findExercisesByNameIsContainingAndMuscleGroupsContaining(search, pageable, muscleGroup);
            }else{
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        List<ExerciseDTO> exerciseDTOList = ExerciseMapper.mapListToDTO(exercises.getContent());

        List<CustomExercise> customExercises = new ArrayList<>();
        if(user.getRole() == ERole.USER){

            if(muscleGroupId == 0){
                customExercises = customExerciseService.findCustomExerciseByUserAndNameIsContaining(user, search);
            }else{
                MuscleGroup muscleGroup = muscleGroupService.findMuscleGroupById(muscleGroupId);

                if(muscleGroup != null){
                    customExercises = customExerciseService.findCustomExerciseByUserAndNameIsContainingAndMuscleGroupsContaining(user, search,  muscleGroup);
                }
            }
            for(CustomExercise customExercise : customExercises){
                exerciseDTOList.add(ExerciseMapper.mapCustomExerciseDTO(customExercise));
            }
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Access-Control-Expose-Headers", "X-Paging-Page,X-Paging-PageSize,X-Paging-PageCount,X-Paging-TotalRecordCount");
        responseHeaders.set("X-Paging-Page", String.valueOf(exercises.getNumber()));
        responseHeaders.set("X-Paging-PageSize", String.valueOf(exercises.getNumberOfElements()));
        responseHeaders.set("X-Paging-PageCount", String.valueOf(exercises.getTotalPages()));
        responseHeaders.set("X-Paging-TotalRecordCount", String.valueOf(exercises.getTotalElements()));

        return new ResponseEntity<>(exerciseDTOList, responseHeaders, HttpStatus.OK);
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<ExerciseDTO> getOne(@PathVariable Long id, @RequestParam boolean custom){

        CustomExercise customExercise = null;
        Exercise exercise = null;
        ExerciseDTO searchedExercise = null;

        if(custom){
            customExercise = customExerciseService.findCustomExerciseById(id);
            if(customExercise != null) {
                searchedExercise = ExerciseMapper.mapCustomExerciseDTO(customExercise);
            }
        }else{
            exercise = exerciseService.findExerciseById(id);
            if(exercise != null) {
                searchedExercise = ExerciseMapper.mapDTO(exercise);
            }
        }

        if(searchedExercise == null){
            System.out.println("no exercise with id = " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


        return new ResponseEntity<>(searchedExercise, HttpStatus.OK);
    }

    @PostMapping(consumes = { "multipart/form-data" })
    @Transactional
    public ResponseEntity<Long> createExercise(@ModelAttribute ExerciseRequestDTO exerciseRequestDTO){

        List<MuscleGroup> muscleGroups = exerciseRequestDTO.getMuscleGroupsIdList().stream()
                .map(id -> muscleGroupService.findMuscleGroupById(id))
                .collect(Collectors.toList());

        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Long id;
        if(user.getRole() == ERole.USER){
            CustomExercise exercise = ExerciseMapper.mapRequestDTOToCustomExercise(exerciseRequestDTO, muscleGroups, user);
            id = customExerciseService.save(exercise).getId();
        }else{
            Exercise exercise = ExerciseMapper.mapRequestDTOToModel(exerciseRequestDTO, muscleGroups);
            id = exerciseService.save(exercise).getId();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
}
