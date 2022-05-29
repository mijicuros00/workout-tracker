package com.ftn.WorkoutTrackerBackend.controller;

import com.ftn.WorkoutTrackerBackend.entity.dto.RegistrationRequestDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.EStatus;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.security.token.LoginRequest;
import com.ftn.WorkoutTrackerBackend.security.token.TokenUtils;
import com.ftn.WorkoutTrackerBackend.service.RegistrationService;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController()
@RequestMapping(value = "/api/auth")
public class AuthController {

    private final RegistrationService registrationService;

    private final TokenUtils tokenUtils;

    private final UserDetailsService userDetailsService;

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    public AuthController(RegistrationService registrationService, TokenUtils tokenUtils, UserDetailsService userDetailsService, UserService userService, AuthenticationManager authenticationManager) {
        this.registrationService = registrationService;
        this.tokenUtils = tokenUtils;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
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

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            User user = userService.findUserByEmail(loginRequest.getEmail());

            if (user == null || user.getStatus() == EStatus.NOT_VERIFIED) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            return new ResponseEntity<>(tokenUtils.generateAccessToken(userDetails), HttpStatus.OK);

        }catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (DisabledException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
}
