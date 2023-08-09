package com.ssafy.hellotoday.api.dto.routine.response;

import lombok.Getter;
import java.util.ArrayList;
import java.util.List;

@Getter
public class RoutinePrivateCheckResponseDto {
    private byte activeFlag; // 현재 진행중인 루틴이 있는지 확인하는 플래그
    private Integer routineId;
    private List<RoutineCheckResponseDto> routineDetailCatCheck = new ArrayList<>();

    public RoutinePrivateCheckResponseDto(byte activeFlag, Integer routineId, List<RoutineCheckResponseDto> routineDetailCatCheck) {
        this.activeFlag = activeFlag;
        this.routineId = routineId;
        this.routineDetailCatCheck = routineDetailCatCheck;
    }
}
