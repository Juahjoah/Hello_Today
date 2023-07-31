package com.ssafy.hellotoday.api.dto.member.response;

import com.ssafy.hellotoday.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberMypageResponse {

    private final Integer MemberId;
    private final String nickname;
    private final String stMsg;
    private final String profileOriginalName;
    private final String profilePath;
    private final Integer showInfoId;

    @Builder
    public MemberMypageResponse(Member member, Integer showInfoId) {
        MemberId = member.getMemberId();
        nickname = member.getNickname();
        stMsg = member.getStMsg();
        profileOriginalName = member.getProfileOriginalName();
        profilePath = member.getProfilePath();
        this.showInfoId = showInfoId;
    }
}
