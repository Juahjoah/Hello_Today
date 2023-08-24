package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.MeetingRoomErrorEnum;
import com.ssafy.hellotoday.db.entity.MeetingRoom;
import com.ssafy.hellotoday.db.entity.MeetingRoomQuestion;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class MeetingRoomValidator {

    public MeetingRoom validMeetingRoom(Optional<MeetingRoom> room) {
        if (room.isEmpty()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(MeetingRoomErrorEnum.ROOM_NOT_EXIST.getCode())
                    .message(MeetingRoomErrorEnum.ROOM_NOT_EXIST.getMessage())
                    .build();
        }
        else return room.get();
    }

    public MeetingRoomQuestion validateMeetingRoomQuestion(Optional<MeetingRoomQuestion> question) {
        if (question.isEmpty()) {
            throw CustomException.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .code(MeetingRoomErrorEnum.FAILED_MEETINGROOM_QUESTION.getCode())
                    .message(MeetingRoomErrorEnum.FAILED_MEETINGROOM_QUESTION.getMessage())
                    .build();
        }
        else return question.get();
    }
}
