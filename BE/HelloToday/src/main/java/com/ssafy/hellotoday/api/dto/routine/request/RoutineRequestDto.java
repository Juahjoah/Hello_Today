package com.ssafy.hellotoday.api.dto.routine.request;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailCatDto;
import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class RoutineRequestDto {
    private Integer memberId;
    private List<RoutineDetailDto> routineDetailDtoList = new ArrayList<>();
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private byte activeFlag;
}
