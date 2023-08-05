package com.ssafy.hellotoday.api.dto.mypage.response;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ToString
@Getter
public class CalendarHistoryDetailResponseDto {
    private String routineContent;
    private LocalDateTime writeDate;
    private String imgPath;
    private String content;

    public CalendarHistoryDetailResponseDto(String routineContent, LocalDateTime checkDate, String imgPath, String content) {
        this.routineContent = routineContent;
        this.writeDate = checkDate;
        this.imgPath = imgPath;
        this.content = content;
    }
}
