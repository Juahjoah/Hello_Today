package com.ssafy.hellotoday.api.dto.mypage.request;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ToString
@Getter
public class DdayRequestDto {
    private Integer memberId;
    private LocalDateTime finalDate;
    private String content;
    private String type;
}
