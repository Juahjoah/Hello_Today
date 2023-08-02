package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class CalendarResponseDto {
    List<RoutineResponseDto> routineResponseDtoList;

    @Builder
    public CalendarResponseDto(List<RoutineResponseDto> routineResponseDtoList) {
        this.routineResponseDtoList = routineResponseDtoList;
    }
}
