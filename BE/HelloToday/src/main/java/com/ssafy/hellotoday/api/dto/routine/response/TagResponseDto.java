package com.ssafy.hellotoday.api.dto.routine.response;

import com.ssafy.hellotoday.db.entity.routine.RoutineTag;
import lombok.Getter;

@Getter
public class TagResponseDto {
    Integer tagId;
    String content;

    public TagResponseDto(RoutineTag routineTag) {
        this.tagId = routineTag.getRoutineTagId();
        this.content = routineTag.getContent();
    }
}
