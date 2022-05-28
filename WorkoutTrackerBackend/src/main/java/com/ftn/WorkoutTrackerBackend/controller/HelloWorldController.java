package com.ftn.WorkoutTrackerBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/hello")
public class HelloWorldController {

    @GetMapping
    public String hello(){
        return "HELLO WORLD;";
    }

}
