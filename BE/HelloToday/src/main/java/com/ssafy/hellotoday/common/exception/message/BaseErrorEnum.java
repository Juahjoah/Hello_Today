package com.ssafy.hellotoday.common.exception.message;

import lombok.Getter;

@Getter
public enum BaseErrorEnum {
    INVALID_PARAM(6000, "필요한 요청 파라미터를 모두 입력해주세요."),
    INVALID_PAGE_NUM(6001, "페이지 번호는 1 이상이어야 합니다.");

    private final int code;
    private final String message;

    BaseErrorEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
