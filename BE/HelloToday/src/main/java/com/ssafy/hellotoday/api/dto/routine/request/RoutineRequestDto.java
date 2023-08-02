package com.ssafy.hellotoday.api.dto.routine.request;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class RoutineRequestDto {
    private List<RoutineDetailDto> routineDetailDtoList = new ArrayList<>();
}
