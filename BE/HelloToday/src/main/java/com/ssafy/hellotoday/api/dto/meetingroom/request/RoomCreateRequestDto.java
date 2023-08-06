package com.ssafy.hellotoday.api.dto.meetingroom.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomCreateRequestDto {
    private boolean audio = true;
    private boolean video = true;
}
