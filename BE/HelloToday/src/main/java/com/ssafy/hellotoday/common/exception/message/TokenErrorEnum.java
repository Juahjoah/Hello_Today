package com.ssafy.hellotoday.common.exception.message;

import lombok.Getter;

@Getter
public enum TokenErrorEnum {
    INVALID_SIGNATURE(400,"JWT 서명이 유효하지 않습니다."),
    INVALID_MALFORMED(402,"유효하지 않은 JWT 토큰입니다."),
    INVALID_EXPIRED(401,"만료된 JWT 토큰입니다."),
    INVALID_UNSUPPORT(403,"지원되지 않는 JWT 토큰입니다.")
    ;
    private final int code;
    private final String message;

    TokenErrorEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
