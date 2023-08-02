package com.ssafy.hellotoday.api.dto.mypage.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class DdayRequestDto {
    private LocalDateTime finalDate;
    private String content;
    private String type;

    @Builder
    public DdayRequestDto(Integer ddayId, LocalDateTime finalDate, String content, String type) {
        this.finalDate = finalDate;
        this.content = content;
        this.type = type;
    }
}
