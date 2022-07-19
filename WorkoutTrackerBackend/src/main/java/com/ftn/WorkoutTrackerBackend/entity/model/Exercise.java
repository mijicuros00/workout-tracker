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
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String name;
    private String description;

    @ElementCollection
    @CollectionTable(name = "exercise_images", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "image", columnDefinition = "MEDIUMBLOB")
    private List<String> images;

    @ManyToMany
    private List<MuscleGroup> muscleGroups;
}
