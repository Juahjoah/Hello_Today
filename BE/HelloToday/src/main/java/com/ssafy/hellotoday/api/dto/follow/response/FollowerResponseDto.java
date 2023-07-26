package com.ssafy.hellotoday.api.dto.follow.response;

import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import lombok.Builder;

import java.util.List;

public class FollowerResponseDto {
    List<MemberResponseDto> follower;

    @Builder
    public FollowerResponseDto(List<MemberResponseDto> follower) {
        this.follower = follower;
    }
}
