package com.ssafy.hellotoday.api.dto.member.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NickNameResponseDto {
    private Integer memberId;
    private String nickname;
    @Builder
    public NickNameResponseDto(Integer memberId, String nickname) {
        this.memberId = memberId;
        this.nickname = nickname;
    }
}
