package com.ssafy.hellotoday.api.dto.meetingroom;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SessionInfo {
    private String sessionId;
    private int joinCnt;
}
