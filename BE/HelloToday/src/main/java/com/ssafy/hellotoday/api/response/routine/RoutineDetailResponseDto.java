package com.ssafy.hellotoday.api.response.routine;

import com.ssafy.hellotoday.db.entity.routine.RoutineBigCat;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetail;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class RoutineDetailResponseDto {
    private Integer routineBigCatId;
    private List<RoutineDetailDto> routineDetail;

//    private Integer routindDetailId;
//    private Integer routineTagId;
//    private String content;
//    private String imgPath;

    public RoutineDetailResponseDto(RoutineDetail routineDetail) {
        this.routineBigCatId = routineDetail.getRoutineBigCat().getRoutineBigCatId();
    }
}
