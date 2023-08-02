package com.ssafy.hellotoday.api.dto.wishdiary.response;

import com.ssafy.hellotoday.db.entity.widget.wishdiary.Type;
import lombok.Builder;
import lombok.Getter;

@Getter
public class WishDiaryResponseDto {

    private Integer wishDiaryId;
    private Integer memberId;
    private String content;
    private Type type;

    @Builder
    public WishDiaryResponseDto(Integer wishDiaryId, Integer memberId, String content, Type type) {
        this.wishDiaryId = wishDiaryId;
        this.memberId = memberId;
        this.content = content;
        this.type = type;
    }
}
