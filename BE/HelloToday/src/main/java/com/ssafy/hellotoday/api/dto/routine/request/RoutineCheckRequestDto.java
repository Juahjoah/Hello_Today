package com.ssafy.hellotoday.api.dto.routine.request;

import com.ssafy.hellotoday.api.dto.routine.RoutineCheckDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoutineCheckRequestDto {
    private Integer memberId;
    private RoutineCheckDto routineCheckDto;
}
