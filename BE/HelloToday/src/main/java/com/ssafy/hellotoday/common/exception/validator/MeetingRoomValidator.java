package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.MeetingRoomErrorEnum;
import com.ssafy.hellotoday.db.entity.MeetingRoom;
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
}
