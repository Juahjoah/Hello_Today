package com.ssafy.hellotoday.common.exception.message;

import lombok.Getter;

@Getter
public enum OpenviduErrorEnum {
    CREATE_SESSION_FAILED(7000, "세션 생성에 실패했습니다."),
    CREATE_CONNECTION_FAILED(7001, "커넥션 생성에 실패했습니다."),
    GET_SESSION_FAILED(7002, "활성화된 세션 조회에 실패했습니다:"),
    FAILED_ROOM_INFO_FETCH(7003, "openvidu 미팅룸 정보 fetch 실패했습니다.");

    private final int code;
    private final String message;

    OpenviduErrorEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
