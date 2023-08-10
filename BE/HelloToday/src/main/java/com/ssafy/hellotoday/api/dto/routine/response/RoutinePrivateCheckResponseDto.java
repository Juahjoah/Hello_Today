package com.ssafy.hellotoday.api.dto.routine.response;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class RoutinePrivateCheckResponseDto {
    private byte activeFlag; // 현재 진행중인 루틴이 있는지 확인하는 플래그
    private Integer routineId;
    private LocalDateTime routineStartDate;
    private List<RoutineCheckResponseDto> routineDetailCatCheck = new ArrayList<>();

    public RoutinePrivateCheckResponseDto(byte activeFlag, Integer routineId, LocalDateTime routineStartDate, List<RoutineCheckResponseDto> routineDetailCatCheck) {
        this.activeFlag = activeFlag;
        this.routineId = routineId;
        this.routineStartDate = routineStartDate;
        this.routineDetailCatCheck = routineDetailCatCheck;
    }
}
