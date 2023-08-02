package com.ssafy.hellotoday.api.dto.member.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberUpdateResposneDto {

    private String nickname;
    private String stMsg;
    private String profilePath;

    @Builder
    public MemberUpdateResposneDto(String nickname, String stMsg, String profilePath) {
        this.nickname = nickname;
        this.stMsg = stMsg;
        this.profilePath = profilePath;
    }
}
