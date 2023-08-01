package com.ssafy.hellotoday.api.dto.mypage.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class DdayResponseDto {
    private Integer memberId;
    private LocalDateTime finalDate;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String content;
    private String type;

    @Builder
    public DdayResponseDto(Integer memberId, LocalDateTime finalDate, LocalDateTime createdDate, LocalDateTime modifiedDate, String content, String type) {
        this.memberId = memberId;
        this.finalDate = finalDate;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.content = content;
        this.type = type;
    }
}
