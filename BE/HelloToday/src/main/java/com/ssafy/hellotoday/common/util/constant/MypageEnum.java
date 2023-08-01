package com.ssafy.hellotoday.common.util.constant;

import lombok.Getter;

@Getter
public enum MypageEnum {
    SUCCESS_WRTITE_CHEER_MESSAGE("응원 메시지 작성을 성공했습니다."),
    SUCCESS_MODIFY_CHEER_MESSAGE("응원 메시지 수정을 성공했습니다.");

    private final String name;

    MypageEnum(String name) {
        this.name = name;
    }
}
