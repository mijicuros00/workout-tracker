package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.dto.RegistrationRequestDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.ConfirmationToken;
import com.ftn.WorkoutTrackerBackend.entity.model.ERole;
import com.ftn.WorkoutTrackerBackend.entity.model.EStatus;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.security.token.TokenUtils;
import com.ftn.WorkoutTrackerBackend.service.ConfirmationTokenService;
import com.ftn.WorkoutTrackerBackend.service.EmailSenderService;
import com.ftn.WorkoutTrackerBackend.service.RegistrationService;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RegistrationServiceImplementation implements RegistrationService {

    @Autowired
    private UserService userService;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    private EmailSenderService emailSenderService;

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public static boolean validate(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    public static boolean validateRegistrationRequest(RegistrationRequestDTO registrationRequestDTO){
        if (registrationRequestDTO.getFirstName().isBlank()){
            return false;
        }else if(registrationRequestDTO.getLastName().isBlank()){
            return false;
        }else if(registrationRequestDTO.getPassword().length() < 6){
            return false;
        }else if(registrationRequestDTO.getRepeatedPassword().length() < 6){
            return false;
        }else if(!registrationRequestDTO.getPassword().equals(registrationRequestDTO.getRepeatedPassword())){
            return false;
        }else if(registrationRequestDTO.getAge() < 1){
            return false;
        }else if(registrationRequestDTO.getHeight() < 100){
            return false;
        }else if(registrationRequestDTO.getWeight() < 30){
            return false;
        }

        boolean isEmailValid = validate(registrationRequestDTO.getEmail());
        if(!isEmailValid){
            return false;
        }

        return true;
    }

    @Transactional
    @Override
    public String register(RegistrationRequestDTO registrationRequestDTO) {

        boolean isRequestValid = validateRegistrationRequest(registrationRequestDTO);
        if(!isRequestValid){
            throw new IllegalStateException("Registration request is not valid!");
        }

        User user = userService.findUserByEmail(registrationRequestDTO.getEmail());

        if(user != null){
            throw new IllegalStateException("User already exists!");
        }

        String encodedPassword = passwordEncoder.encode(registrationRequestDTO.getPassword());

        User registeredUser = User.builder()
                .firstName(registrationRequestDTO.getFirstName())
                .lastName(registrationRequestDTO.getLastName())
                .email(registrationRequestDTO.getEmail())
                .password(encodedPassword)
                .age(registrationRequestDTO.getAge())
                .gender(registrationRequestDTO.getGender())
                .height(registrationRequestDTO.getHeight())
                .weight(registrationRequestDTO.getWeight())
                .role(ERole.USER)
                .status(EStatus.NOT_VERIFIED)
                .build();

        userService.save(registeredUser);

        UserDetails userDetails = userDetailsService.loadUserByUsername(registeredUser.getEmail());

        String token = tokenUtils.generateRegistrationToken(userDetails);

        ConfirmationToken confirmationToken = new ConfirmationToken(token, null, registeredUser);
        confirmationTokenService.save(confirmationToken);

        String link = "https://localhost:8080/api/auth/confirm?token=" + confirmationToken.getToken();
        emailSenderService.send(registeredUser.getEmail(), emailSenderService.registerEmail(registeredUser.getFirstName(), link), "Verify your email");

        return token;
    }

    @Override
    public String confirmToken(String token) {
        return null;
    }
}

