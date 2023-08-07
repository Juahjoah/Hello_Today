package com.ssafy.hellotoday.api.dto.meetingroom.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class MeetingRoomQuestionResponseDto {
    private int id;
    private String content;
}
