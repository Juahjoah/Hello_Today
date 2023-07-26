package com.ssafy.hellotoday.api.dto.follow.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowResponseDto {
    private final int followId;
    private final int followerId;
    private final int followingId;

    @Builder
    public FollowResponseDto(int followId, int followerId, int followingId) {
        this.followId = followId;
        this.followerId = followerId;
        this.followingId = followingId;
    }
}
