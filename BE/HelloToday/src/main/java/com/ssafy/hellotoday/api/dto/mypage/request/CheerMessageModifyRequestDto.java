package com.ssafy.hellotoday.api.dto.mypage.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CheerMessageModifyRequestDto {
    private Integer cheerMessageId;
    private Integer memberId;
    private String content;
}
