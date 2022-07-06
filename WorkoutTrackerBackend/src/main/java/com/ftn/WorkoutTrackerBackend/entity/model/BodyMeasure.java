package com.ftn.WorkoutTrackerBackend.entity.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class BodyMeasure {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private String name;

    private Double value;

    @ManyToOne
    private User user;

    private Date date;
}
