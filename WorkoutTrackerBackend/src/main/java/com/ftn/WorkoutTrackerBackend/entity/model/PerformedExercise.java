package com.ftn.WorkoutTrackerBackend.entity.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class PerformedExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @OneToMany(cascade = CascadeType.PERSIST)
    List<WorkingSet> workingSets;

    @ManyToOne
    private Exercise exercise;

}
