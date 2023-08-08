package com.ssafy.hellotoday.api.dto.routine.response;

import com.ssafy.hellotoday.db.entity.routine.RoutineCheck;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RoutineCheckUpdateDto {

    private Integer routineCheckId;
    private Integer routineDetailCatId;
    private Integer checkDaySeq;
    private String content;
    private String imgPath;
    private LocalDateTime checkDate;

    @Builder
    public RoutineCheckUpdateDto(RoutineCheck routineCheck) {
        this.routineCheckId = routineCheck.getRoutineCheckId();
        this.routineDetailCatId = routineCheck.getRoutineDetailCat().getRoutineDetailCatId();
        this.checkDaySeq = routineCheck.getCheckDaySeq();
        this.content = routineCheck.getContent();
        this.imgPath = routineCheck.getRoutineImagePath();
        this.checkDate = routineCheck.getCheckDate();
    }
}
