package com.ssafy.hellotoday.api.dto.mypage.response;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ToString
@Getter
public class CalendarDetailResponseDto {
    private String routineContent;
    private LocalDateTime writeDate;
    private String imgPath;
    private String content;

    public CalendarDetailResponseDto(String routineContent, LocalDateTime checkDate, String imgPath, String content) {
        this.routineContent = routineContent;
        this.writeDate = checkDate;
        this.imgPath = imgPath;
        this.content = content;
    }
}
