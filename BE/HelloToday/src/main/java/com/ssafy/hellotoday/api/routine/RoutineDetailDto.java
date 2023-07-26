package com.ssafy.hellotoday.api.routine;

import com.ssafy.hellotoday.db.entity.routine.RoutineDetail;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class RoutineDetailDto {
    private Integer routineDetailId;
    private Integer routineTagId;
    private String content;
    private String imgPath;

    public RoutineDetailDto(RoutineDetail routineDetail) {
        this.routineDetailId = routineDetail.getRoutineDetailId();
        this.routineTagId = routineDetail.getRoutineTag().getRoutineTagId();
        this.content = routineDetail.getContent();
        this.imgPath = routineDetail.getImgPath();
    }
}
