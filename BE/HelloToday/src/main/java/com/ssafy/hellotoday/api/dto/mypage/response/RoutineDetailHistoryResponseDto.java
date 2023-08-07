package com.ssafy.hellotoday.api.dto.mypage.response;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class RoutineDetailHistoryResponseDto {
    private Integer checkDaySeq;
    private List<CalendarHistoryDetailResponseDto> routineDetail = new ArrayList<>();

    public RoutineDetailHistoryResponseDto(int daySeq, List<CalendarHistoryDetailResponseDto> routineDetailList) {
        this.checkDaySeq = daySeq;
        this.routineDetail = routineDetailList;
    }
}
