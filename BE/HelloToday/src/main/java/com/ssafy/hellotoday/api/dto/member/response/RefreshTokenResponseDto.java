package com.ssafy.hellotoday.api.dto.member.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RefreshTokenResponseDto {
    private Integer memberId;
    private String message;

    @Builder
    public RefreshTokenResponseDto(Integer memberId, String message) {
        this.memberId = memberId;
        this.message = message;
    }
}
