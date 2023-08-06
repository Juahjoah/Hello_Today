package com.ssafy.hellotoday.api.dto.meetingroom;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@AllArgsConstructor
@Getter
public class MeetingRoomDto implements Serializable {
    private int memberId;
    private String sessionId;
    private String name;
    private String description;
    private int memberLimit;
    LocalDateTime createdDate;
    LocalDateTime modifiedDate;
}
