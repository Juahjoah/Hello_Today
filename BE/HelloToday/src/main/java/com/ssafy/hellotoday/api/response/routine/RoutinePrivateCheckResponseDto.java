package com.ssafy.hellotoday.api.response.routine;

import com.ssafy.hellotoday.api.dto.routine.RoutineCheckDto;

import java.util.ArrayList;
import java.util.List;

public class RoutinePrivateCheckResponseDto {
    private byte activeFlag;
    private List<RoutineCheckDto> routineCheckDtoList = new ArrayList<>();
}
