package com.ssafy.hellotoday.api.dto.mypage.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class DdayModifyRequestDto {
    private Integer ddayId;
    private LocalDateTime finalDate;
    private String content;
}
