package com.ssafy.hellotoday.api.dto.meetingroom.response;

import com.ssafy.hellotoday.api.dto.meetingroom.MeetingRoomDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@AllArgsConstructor
@Getter
public class MeetingRoomPageDto {
    private int totalPages;
    private long totalRooms;
    private List<MeetingRoomDto> rooms;
}
