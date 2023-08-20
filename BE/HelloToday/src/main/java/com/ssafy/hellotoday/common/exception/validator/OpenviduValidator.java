package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.MeetingRoomErrorEnum;
import com.ssafy.hellotoday.common.exception.message.OpenviduErrorEnum;
import com.ssafy.hellotoday.db.entity.MeetingRoom;
import io.openvidu.java.client.Session;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class OpenviduValidator {

    public void checkSession(Session session, String sessionId) {
        if (session == null) {
            throw CustomException.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .code(OpenviduErrorEnum.GET_SESSION_FAILED.getCode())
                    .message(OpenviduErrorEnum.GET_SESSION_FAILED.getMessage() + sessionId)
                    .build();
        }
    }

    public void checkUnderMemberLimit(Session session, MeetingRoom room) {
        if (session.getActiveConnections().size() >= room.getMemberLimit()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(MeetingRoomErrorEnum.CANNOT_ENTER_OVER_MEMBER_LIMIT.getCode())
                    .message(MeetingRoomErrorEnum.CANNOT_ENTER_OVER_MEMBER_LIMIT.getMessage())
                    .build();
        }
    }

    public void failedRoomInfoFetch() {
        throw CustomException.builder()
                .status(HttpStatus.BAD_REQUEST)
                .code(OpenviduErrorEnum.FAILED_ROOM_INFO_FETCH.getCode())
                .message(OpenviduErrorEnum.FAILED_ROOM_INFO_FETCH.getMessage())
                .build();
    }
}
