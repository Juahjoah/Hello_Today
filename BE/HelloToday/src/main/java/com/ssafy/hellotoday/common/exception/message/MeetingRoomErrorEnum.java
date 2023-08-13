package com.ssafy.hellotoday.common.exception.message;

import lombok.Getter;

@Getter
public enum MeetingRoomErrorEnum {
    ROOM_NOT_EXIST(8000, "미팅룸 조회에 실패했습니다."),
    CANNOT_ENTER_OVER_MEMBER_LIMIT(8001, "방 입장 제한 수를 초과하여 입장할 수 없습니다."),
    FAILED_MEETINGROOM_QUESTION(8002, "질문 조회에 실패했습니다.");


    private int code;
    private String message;

    MeetingRoomErrorEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
