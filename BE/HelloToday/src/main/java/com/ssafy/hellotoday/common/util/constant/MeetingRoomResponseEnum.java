package com.ssafy.hellotoday.common.util.constant;

import lombok.Getter;

@Getter
public enum MeetingRoomResponseEnum {
    SUCCESS_MEETINGROOM_QUESTION("미팅룸 질문 조회에 성공했습니다."),
    CLOSE_MEETINGROOM("미팅룸이 종료되었습니다.", 100),
    EXIT_MEETINGROOM("미팅룸을 나갔습니다.", 200);

    private final String name;
    private int code;

    MeetingRoomResponseEnum(String name) {
        this.name = name;
    }

    MeetingRoomResponseEnum(String name, int code) {
        this.name = name;
        this.code = code;
    }
}
