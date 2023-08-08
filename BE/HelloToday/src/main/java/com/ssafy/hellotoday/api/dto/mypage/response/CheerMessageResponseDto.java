package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CheerMessageResponseDto {
    private Integer messageId;
    private Integer writerId;
    private Integer memberId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String content;

    @Builder
    public CheerMessageResponseDto(Integer messageId, Integer writerId, Integer memberId, LocalDateTime createdDate, LocalDateTime modifiedDate, String content) {
        this.messageId = messageId;
        this.writerId = writerId;
        this.memberId = memberId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.content = content;
    }

    public CheerMessageResponseDto(CheerMessage cheerMessage) {
        this.messageId = cheerMessage.getCheerMessageId();
        this.writerId = cheerMessage.getWriter().getMemberId();
        this.memberId = cheerMessage.getMember().getMemberId();
        this.createdDate = cheerMessage.getCreatedDate();
        this.modifiedDate = cheerMessage.getModifiedDate();
        this.content = cheerMessage.getContent();
    }
}
