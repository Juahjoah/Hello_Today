package com.ssafy.hellotoday.api.dto.mypage.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CheerMessageResponseDto {
    private Integer writerId;
    private Integer memberId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String content;

    @Builder
    public CheerMessageResponseDto(Integer writerId, Integer memberId, LocalDateTime createdDate, LocalDateTime modifiedDate, String content) {
        this.writerId = writerId;
        this.memberId = memberId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.content = content;
    }
}
