package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RoutineHistoryResponseDto {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String imgPath;

    @Builder
    public RoutineHistoryResponseDto(LocalDateTime startDate, LocalDateTime endDate, String imgPath) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.imgPath = imgPath;
    }
}
