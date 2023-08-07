package com.ssafy.hellotoday.common.util.constant;

import lombok.Getter;

@Getter
public enum RoutineEnum {
    SUCCESS_MAKE_ROTUINE("루틴 생성에 성공했습니다.");

    private String name;

    RoutineEnum(String name) {
        this.name = name;
    }
}
