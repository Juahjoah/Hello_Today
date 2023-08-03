package com.ssafy.hellotoday.api.dto.member.response;

import com.ssafy.hellotoday.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfoResponseDto {

    private Integer memberId;
    private String email;
    private String nickname;
    private String stMsg;
    private String profilePath;
    @Builder
    public MemberInfoResponseDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.stMsg = member.getStMsg();
        this.profilePath = member.getProfileImagePath();
    }
}
