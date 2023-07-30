package com.ssafy.hellotoday.api.dto.routine;

import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.entity.routine.RoutineCheck;
import lombok.Getter;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class RoutineCheckDto {
    private Integer routineCheckId;
    private Integer routineDetailCatId;
    private Integer checkDaySeq;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String content;
    private String imgPath;
    private String imgOriName;
    private LocalDateTime checkDate;

    public RoutineCheckDto(RoutineCheck routineCheck) {
        this.routineCheckId = routineCheck.getRoutineCheckId();
        this.routineDetailCatId = routineCheck.getRoutineDetailCat().getRoutineDetailCatId();
        this.checkDaySeq = routineCheck.getCheckDaySeq();
        this.createdDate = routineCheck.getCreatedDate();
        this.modifiedDate = routineCheck.getModifiedDate();
        this.content = routineCheck.getContent();
        this.imgPath = routineCheck.getImgPath();
        this.imgOriName = routineCheck.getImgOriginalName();
        this.checkDate = routineCheck.getCheckDate();

    }
}
