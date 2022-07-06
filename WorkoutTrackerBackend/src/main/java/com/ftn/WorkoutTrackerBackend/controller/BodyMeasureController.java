package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.dto.BodyMeasureDTO;
import com.ftn.WorkoutTrackerBackend.entity.mapper.BodyMeasureMapper;
import com.ftn.WorkoutTrackerBackend.entity.model.BodyMeasure;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.service.BodyMeasureService;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/measures")
public class BodyMeasureController {

    @Autowired
    private BodyMeasureService bodyMeasureService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<BodyMeasureDTO>> getAll(){
        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<BodyMeasure> bodyMeasures = bodyMeasureService.findBodyMeasuresByUser(user);

        return new ResponseEntity<>(BodyMeasureMapper.mapListToDTO(bodyMeasures), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<List<BodyMeasureDTO>> getByName(@PathVariable Long id){
        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        BodyMeasure bodyMeasure = bodyMeasureService.findBodyMeasureById(id);

        List<BodyMeasure> bodyMeasures = bodyMeasureService.findBodyMeasuresByNameAndUser(bodyMeasure.getName(), user);

        return new ResponseEntity<>(BodyMeasureMapper.mapListToDTO(bodyMeasures), HttpStatus.OK);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<BodyMeasureDTO> create(@RequestBody BodyMeasureDTO bodyMeasureDTO){

        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        bodyMeasureDTO.setDate(new Date());
        BodyMeasure bodyMeasure = BodyMeasureMapper.mapModel(bodyMeasureDTO);
        bodyMeasure.setUser(user);

        BodyMeasure createdBodyMeasure = bodyMeasureService.save(bodyMeasure);

        return new ResponseEntity<>(BodyMeasureMapper.mapDTO(createdBodyMeasure), HttpStatus.CREATED);
    }
}
