package com.ssafy.hellotoday.api.dto.meetingroom.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RoomJoinResponseDto {
    private String token;
}
