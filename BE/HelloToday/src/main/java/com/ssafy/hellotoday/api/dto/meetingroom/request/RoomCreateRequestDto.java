package com.ssafy.hellotoday.api.dto.meetingroom.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomCreateRequestDto {
    private String title;
    private String description;
    private int memberLimit = 6;
    private boolean audio = true;
    private boolean video = true;
}
