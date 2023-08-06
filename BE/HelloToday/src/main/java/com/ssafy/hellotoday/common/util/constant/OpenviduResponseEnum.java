package com.ssafy.hellotoday.common.util.constant;

import lombok.Getter;

@Getter
public enum OpenviduResponseEnum {
    SUCCESS_CREATE_SESSION("세션이 생성되었습니다."),
    SUCCESS_GET_TOKEN("토큰이 조회되었습니다.");

    private final String name;

    OpenviduResponseEnum(String name) {
        this.name = name;
    }
}
