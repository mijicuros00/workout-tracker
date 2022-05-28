package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.dto.RegistrationRequestDTO;
import com.ftn.WorkoutTrackerBackend.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController()
@RequestMapping(value = "/api/auth")
public class AuthController {

    private final RegistrationService registrationService;

    public AuthController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping(value = "/registration")
    public ResponseEntity registration(@RequestBody RegistrationRequestDTO registrationRequestDTO){
        System.out.println(registrationRequestDTO);
        try{
            registrationService.register(registrationRequestDTO);
        }catch (IllegalStateException illegalStateException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/confirm")
    public String confirmToken(@RequestParam(value = "token") String token) {
        return registrationService.confirmToken(token);
    }
}
