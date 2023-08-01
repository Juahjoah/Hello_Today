package com.ssafy.hellotoday.api.dto.routine.response;

import com.ssafy.hellotoday.api.dto.routine.RoutineCheckDto;
import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class RoutineCheckResponseDto {
    private RoutineDetailDto routineDetailDto;
//    private Integer routineDetailCatId;
    private List<RoutineCheckDto> routineCheckDtoList = new ArrayList<>();

    @Builder
    public RoutineCheckResponseDto(RoutineDetailDto routineDetailDto, List<RoutineCheckDto> routineCheckDtoList) {
        this.routineDetailDto = routineDetailDto;
        this.routineCheckDtoList = routineCheckDtoList;
    }
}
