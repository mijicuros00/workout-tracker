package com.ftn.WorkoutTrackerBackend.entity.model;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class WorkingSet {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private Double weight;
    private Integer reps;

}
