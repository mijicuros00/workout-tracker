package com.ftn.workouttrackerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@ComponentScan("com.ftn.workouttrackerbackend.repository")
public class WorkoutTrackerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkoutTrackerBackendApplication.class, args);
	}

}
