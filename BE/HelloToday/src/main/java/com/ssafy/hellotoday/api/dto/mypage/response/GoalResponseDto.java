package com.ssafy.hellotoday.api.dto.mypage.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GoalResponseDto {

    private Integer goalId;
    private Integer memberId;
    private String content;
    private String type;

    @Builder
    public GoalResponseDto(Integer goalId, Integer memberId, String content, String type) {
        this.goalId = goalId;
        this.memberId = memberId;
        this.content = content;
        this.type = type;
    }
}
