package com.ssafy.hellotoday.api.dto.routine.response;

import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import lombok.Getter;

@Getter
public class RoutineRecMentResponseDto {
    private Integer routineBigCatId;
    private String content;

    public RoutineRecMentResponseDto(RecommendMent recommendMent) {
        this.routineBigCatId = recommendMent.getRoutineBigCat().getRoutineBigCatId();
        this.content = recommendMent.getContent();
    }
}
