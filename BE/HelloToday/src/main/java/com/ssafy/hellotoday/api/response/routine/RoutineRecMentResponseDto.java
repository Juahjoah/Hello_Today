package com.ssafy.hellotoday.api.response.routine;

import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import lombok.Getter;

@Getter
public class RoutineRecMentResponseDto {
    private String content;

    public RoutineRecMentResponseDto(RecommendMent recommendMent) {
        this.content = recommendMent.getContent();
    }
}
