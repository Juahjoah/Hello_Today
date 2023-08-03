package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.db.entity.mypage.Dday;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

@Getter
@NoArgsConstructor
public class DdayResponseDto {
    private Integer memberId;
    private LocalDateTime finalDate;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String content;
    private Integer calDate;

    @Builder
    public DdayResponseDto(Integer memberId, LocalDateTime finalDate, LocalDateTime createdDate, LocalDateTime modifiedDate, String content, Integer calDate) {
        this.memberId = memberId;
        this.finalDate = finalDate;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.content = content;
        this.calDate = calDate;
    }

    public DdayResponseDto(Dday dday) {
        this.memberId = dday.getMember().getMemberId();
        this.finalDate = dday.getFinalDate();
        this.createdDate = dday.getCreatedDate();
        this.modifiedDate = dday.getModifiedDate();
        this.content = dday.getContent();
        this.calDate = calDate(dday);
    }

    private Integer calDate(Dday dday) {
        LocalDate finalDate = LocalDate.from(dday.getFinalDate());
        LocalDate now = LocalDate.now();

        return Period.between(finalDate, now).getDays();
    }
}
