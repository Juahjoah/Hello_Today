package com.ssafy.hellotoday.api.dto.routine.request;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class RoutineRequestDto {
    private Integer memberId;
    private List<RoutineDetailDto> routineDetailDtoList = new ArrayList<>();
}
