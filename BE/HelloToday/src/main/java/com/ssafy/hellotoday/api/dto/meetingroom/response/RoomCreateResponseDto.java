package com.ssafy.hellotoday.api.dto.meetingroom.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomCreateResponseDto {
    private int roomId;
    private String sessionId;
    private String token;

    @Builder
    public RoomCreateResponseDto(int roomId, String sessionId, String token) {
        this.roomId = roomId;
        this.sessionId = sessionId;
        this.token = token;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }
}
