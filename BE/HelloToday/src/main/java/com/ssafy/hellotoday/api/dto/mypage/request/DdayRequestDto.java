package com.ssafy.hellotoday.api.dto.mypage.request;

import lombok.ToString;

import java.time.LocalDateTime;

@ToString
public class DdayRequestDto {
    private LocalDateTime finalDate;
    private String content;
    private String type;
}
