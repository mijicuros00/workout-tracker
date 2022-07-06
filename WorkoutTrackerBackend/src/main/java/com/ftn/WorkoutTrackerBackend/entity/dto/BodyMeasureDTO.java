package com.ftn.WorkoutTrackerBackend.entity.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class BodyMeasureDTO {
    private Long id;
    private String name;
    private Double value;
    private Date date;
}
