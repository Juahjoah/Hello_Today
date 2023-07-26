package com.ssafy.hellotoday.api.routine.response;

import com.ssafy.hellotoday.api.routine.RoutineDetailDto;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetail;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class RoutineDetailResponseDto {
    private Integer routineBigCatId;
    private List<RoutineDetailDto> routineDetail;

    @Builder
    public RoutineDetailResponseDto(Integer routineBigCatId, List<RoutineDetailDto> routineDetail) {
        this.routineBigCatId = routineBigCatId;
        this.routineDetail = routineDetail;
    }
}
