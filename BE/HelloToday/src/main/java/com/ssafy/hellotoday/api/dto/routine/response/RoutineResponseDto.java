package com.ssafy.hellotoday.api.dto.routine.response;

import com.ssafy.hellotoday.db.entity.routine.Routine;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RoutineResponseDto {
    private Integer routineId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private byte activeFlag;

    @Builder
    public RoutineResponseDto(Integer routineId, LocalDateTime startDate, LocalDateTime endDate, byte activeFlag) {
        this.routineId = routineId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activeFlag = activeFlag;
    }

    public RoutineResponseDto(Routine routine) {
        this.routineId = routine.getRoutineId();
        this.startDate = routine.getStartDate();
        this.endDate = routine.getEndDate();
    }
}
