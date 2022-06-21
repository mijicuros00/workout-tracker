package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.dto.ExerciseDTO;
import com.ftn.WorkoutTrackerBackend.entity.dto.ExerciseRequestDTO;
import com.ftn.WorkoutTrackerBackend.entity.mapper.ExerciseMapper;
import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import com.ftn.WorkoutTrackerBackend.service.ExerciseService;
import com.ftn.WorkoutTrackerBackend.service.MuscleGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private MuscleGroupService muscleGroupService;

    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getAll(Pageable pageable, @RequestParam(value = "search", defaultValue = "") String search, @RequestParam(required = false) Long muscleGroupId){

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

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Access-Control-Expose-Headers", "X-Paging-Page,X-Paging-PageSize,X-Paging-PageCount,X-Paging-TotalRecordCount");
        responseHeaders.set("X-Paging-Page", String.valueOf(exercises.getNumber()));
        responseHeaders.set("X-Paging-PageSize", String.valueOf(exercises.getNumberOfElements()));
        responseHeaders.set("X-Paging-PageCount", String.valueOf(exercises.getTotalPages()));
        responseHeaders.set("X-Paging-TotalRecordCount", String.valueOf(exercises.getTotalElements()));

        return new ResponseEntity<>(ExerciseMapper.mapListToDTO(exercises.getContent()), responseHeaders, HttpStatus.OK);
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<ExerciseDTO> getOne(@PathVariable Long id){
        Exercise exercise = exerciseService.findExerciseById(id);

        if(exercise == null){
            System.out.println("no exercise with id = " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(ExerciseMapper.mapDTO(exercise), HttpStatus.OK);
    }

    @PostMapping(consumes = { "multipart/form-data" })
    @Transactional
    public ResponseEntity<Long> createExercise(@ModelAttribute ExerciseRequestDTO exerciseRequestDTO){

        List<MuscleGroup> muscleGroups = exerciseRequestDTO.getMuscleGroupsIdList().stream()
                .map(id -> muscleGroupService.findMuscleGroupById(id))
                .collect(Collectors.toList());

        Exercise exercise = ExerciseMapper.mapRequestDTOToModel(exerciseRequestDTO, muscleGroups);
        Long id = exerciseService.save(exercise).getId();

        String location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUriString();

        return ResponseEntity.status(HttpStatus.CREATED).header(HttpHeaders.LOCATION, location).body(id);
    }
}
