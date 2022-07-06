package com.ftn.WorkoutTrackerBackend.entity.mapper;

import com.ftn.WorkoutTrackerBackend.entity.dto.BodyMeasureDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.BodyMeasure;

import java.util.List;
import java.util.stream.Collectors;

public class BodyMeasureMapper {

    public static BodyMeasure mapModel(BodyMeasureDTO bodyMeasureDTO){
        return BodyMeasure.builder()
                .name(bodyMeasureDTO.getName())
                .value(bodyMeasureDTO.getValue())
                .date(bodyMeasureDTO.getDate())
                .build();
    }

    public static BodyMeasureDTO mapDTO(BodyMeasure bodyMeasure){
        return BodyMeasureDTO.builder()
                .id(bodyMeasure.getId())
                .name(bodyMeasure.getName())
                .value(bodyMeasure.getValue())
                .date(bodyMeasure.getDate())
                .build();
    }

    public static List<BodyMeasureDTO> mapListToDTO(List<BodyMeasure> bodyMeasures){
        return bodyMeasures.stream().map(bodyMeasure -> mapDTO(bodyMeasure)).collect(Collectors.toList());
    }
}
