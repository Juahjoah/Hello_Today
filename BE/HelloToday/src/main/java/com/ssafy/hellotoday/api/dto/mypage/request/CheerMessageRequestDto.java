package com.ssafy.hellotoday.api.dto.mypage.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CheerMessageRequestDto {
    private Integer memberId;
    private String content;
}
