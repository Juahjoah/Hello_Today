package com.ssafy.hellotoday.api.dto.routine.request;

import com.ssafy.hellotoday.api.dto.routine.RoutineCheckDto;
import lombok.Getter;

@Getter
public class RoutineCheckRequestDto {
    private Integer memberId;
    private RoutineCheckDto routineCheckDto;
}
