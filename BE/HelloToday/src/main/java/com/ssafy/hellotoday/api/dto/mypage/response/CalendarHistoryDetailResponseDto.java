package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.common.util.property.ApplicationProperties;
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

    public CalendarHistoryDetailResponseDto(String routineContent, LocalDateTime checkDate, String imgOriginalName, String content) {
        this.routineContent = routineContent;
        this.writeDate = checkDate;
        this.imgPath = getRoutineCheckImagePath(imgOriginalName);
        this.content = content;
    }

    public String getRoutineCheckImagePath(String imgOriginalName) {
        if(imgOriginalName == null) return null;

        return ApplicationProperties.HOST_IMAGE_URL + "routine/" + imgOriginalName;
    }
}
