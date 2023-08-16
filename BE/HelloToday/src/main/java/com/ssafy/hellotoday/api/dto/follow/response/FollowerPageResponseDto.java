package com.ssafy.hellotoday.api.dto.follow.response;

import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class FollowerPageResponseDto {
    private int totalPages;
    private int totalFollowers;
    private List<MemberResponseDto> followers;
}
