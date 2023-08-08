package com.ssafy.hellotoday.api.dto.routine;

import com.ssafy.hellotoday.db.entity.routine.RoutineDetail;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetailCat;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoutineDetailDto {
    private Integer routineDetailId;
    private String content;
    private String imgPath;

    public RoutineDetailDto(RoutineDetail routineDetail) {
        this.routineDetailId = routineDetail.getRoutineDetailId();
        this.content = routineDetail.getContent();
        this.imgPath = routineDetail.getImgPath();
    }

    public RoutineDetailCat toRoutineDetailCat() {
        return RoutineDetailCat.builder()
                .routineDetailCatId(routineDetailId)
                .build();
    }
}
