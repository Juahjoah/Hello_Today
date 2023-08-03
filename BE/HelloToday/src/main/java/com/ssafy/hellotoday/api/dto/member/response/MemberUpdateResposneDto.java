package com.ssafy.hellotoday.api.dto.member.response;

import com.ssafy.hellotoday.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberUpdateResposneDto {

    private String nickname;
    private String stMsg;
    private String profilePath;

    @Builder
    public MemberUpdateResposneDto(Member member) {
        this.nickname = member.getNickname();
        this.stMsg = member.getStMsg();
        this.profilePath = member.getProfileImagePath();
    }
}
