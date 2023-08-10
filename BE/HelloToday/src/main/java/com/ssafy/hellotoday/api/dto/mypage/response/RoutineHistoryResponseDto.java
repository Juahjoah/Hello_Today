package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RoutineHistoryResponseDto {
    private Integer routineId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String imgPath;
    private Integer pageNum;

    @Builder
    public RoutineHistoryResponseDto(Integer routineId, LocalDateTime startDate, LocalDateTime endDate, String imgPath, Integer pageNum) {
        this.routineId = routineId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imgPath = imgPath;
        this.pageNum = pageNum;
    }
}
