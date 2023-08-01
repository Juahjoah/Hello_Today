package com.ssafy.hellotoday.api.dto.routine.response;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailCatDto;
import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetailCat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class RoutineResponseDto {
    private Integer routineId;
    private Integer memberId;
    private List<RoutineDetailCat> routineDetailCatList = new ArrayList<>();
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private byte activeFlag;

    @Builder
    public RoutineResponseDto(Integer routineId, Integer memberId, List<RoutineDetailCat> routineDetailCatList, LocalDateTime startDate, LocalDateTime endDate, byte activeFlag) {
        this.routineId = routineId;
        this.memberId = memberId;
        this.routineDetailCatList = routineDetailCatList;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activeFlag = activeFlag;
    }
}
