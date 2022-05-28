package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();
    User findUserByEmail(String email);
    User findUserById(Long id);
    User save(User user);

}
