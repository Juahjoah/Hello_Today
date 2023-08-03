package com.ssafy.hellotoday.api.dto.meetingroom;

import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.util.UUID;

@Getter
public class MeetingRoomDto implements Serializable {
    private int memberId;
    private String sessionId;
    private String name;
    private int memberLimit;

    @Builder
    public MeetingRoomDto(int memberId, String sessionId, String name, int memberLimit) {
        this.memberId = memberId;
        this.sessionId = sessionId;
        this.name = name;
        this.memberLimit = memberLimit;
    }

    public static MeetingRoomDto create(int memberId, String sessionId, String name, int memberLimit) {
        return MeetingRoomDto.builder()
                .sessionId(UUID.randomUUID().toString())
                .name(name)
                .memberLimit(memberLimit)
                .build();
    }
}
