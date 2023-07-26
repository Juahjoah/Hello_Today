package com.ssafy.hellotoday.api.dto.member.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberResponseDto {
    private Integer memberId;
    private String email;
    private String nickname;
    private String stMsg;
    private String profilePath;

    @Builder
    public MemberResponseDto(Integer memberId, String email, String nickname, String stMsg, String profilePath) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.stMsg = stMsg;
        this.profilePath = profilePath;
    }
}
