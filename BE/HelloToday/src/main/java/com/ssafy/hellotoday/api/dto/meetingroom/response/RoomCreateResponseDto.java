package com.ssafy.hellotoday.api.dto.meetingroom.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomCreateResponseDto {
    private String sessionId;
    private String token;

    @Builder
    public RoomCreateResponseDto(String sessionId, String token) {
        this.sessionId = sessionId;
        this.token = token;
    }
}
