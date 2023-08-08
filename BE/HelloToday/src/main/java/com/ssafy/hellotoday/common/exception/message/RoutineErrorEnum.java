package com.ssafy.hellotoday.common.exception.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public enum RoutineErrorEnum {
    EXIST_ROUTINE_STATUS(4000,"이미 진행하고 있는 루틴이 존재합니다.");
    private final Integer code;
    private final String name;

    RoutineErrorEnum(Integer code, String name) {
        this.code = code;
        this.name = name;
    }
}
