package com.ssafy.hellotoday.api.dto.routine;

import com.ssafy.hellotoday.db.entity.routine.RoutineDetail;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
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
