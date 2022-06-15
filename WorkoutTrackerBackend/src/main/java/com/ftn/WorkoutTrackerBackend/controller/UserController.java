package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.Exception.NotFoundException;
import com.ftn.WorkoutTrackerBackend.entity.dto.UpdateUserDTO;
import com.ftn.WorkoutTrackerBackend.entity.dto.UserDTO;
import com.ftn.WorkoutTrackerBackend.entity.mapper.UserMapper;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin
@RestController()
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/token")
    public ResponseEntity<UserDTO> getUserFromToken(){
        User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(UserMapper.mapDTO(user), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    @Transactional
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO updateUserDTO){
        User updatedUser;
        try{
            updatedUser = userService.update(id, updateUserDTO);
        } catch (NotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUriString();

        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.LOCATION, location).body(UserMapper.mapDTO(updatedUser));

    }

}
