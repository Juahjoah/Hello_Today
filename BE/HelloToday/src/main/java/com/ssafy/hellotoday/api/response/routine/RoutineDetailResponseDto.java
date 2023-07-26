package com.ssafy.hellotoday.api.response.routine;

import com.ssafy.hellotoday.db.entity.routine.RoutineDetail;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class RoutineDetailResponseDto {
    private Integer routindDetailId;
    private String content;
    private String imgPath;

    public RoutineDetailResponseDto(RoutineDetail routineDetail) {
        this.routindDetailId = routineDetail.getRoutineDetailId();
        this.content = routineDetail.getContent();
        this.imgPath = routineDetail.getImgPath();
    }
}
