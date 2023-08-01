package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.db.entity.mypage.Dday;
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

    public DdayResponseDto(Dday dday) {
        this.memberId = dday.getMember().getMemberId();
        this.finalDate = dday.getFinalDate();
        this.createdDate = dday.getCreatedDate();
        this.modifiedDate = dday.getModifiedDate();
        this.content = dday.getContent();
        this.type = String.valueOf(dday.getType());
    }
}
