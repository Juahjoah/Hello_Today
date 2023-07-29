package com.ssafy.hellotoday.api.dto.routine;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RoutineCheckDto {
    private Integer routineCheckId;
    private Integer routineDetailCatId;
    private LocalDateTime createdDate;
    private String content;
    private LocalDateTime modifiedDAte;
    private String imgPath;
    private String imgOriName;
}
