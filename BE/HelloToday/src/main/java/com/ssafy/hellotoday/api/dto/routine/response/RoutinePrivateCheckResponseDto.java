package com.ssafy.hellotoday.api.dto.routine.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class RoutinePrivateCheckResponseDto {
    private byte activeFlag; // 현재 진행중인 루틴이 있는지 확인하는 플래그
    private List<RoutineCheckResponseDto> routineDetailCatCheck = new ArrayList<>();

    public RoutinePrivateCheckResponseDto(byte activeFlag, List<RoutineCheckResponseDto> routineDetailCatCheck) {
        this.activeFlag = activeFlag;
        this.routineDetailCatCheck = routineDetailCatCheck;
    }

}
