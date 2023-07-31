package com.ssafy.hellotoday.api.dto.member.response;

import com.ssafy.hellotoday.db.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MypageModifyResponse {

    private final Integer MemberId;
    private final String nickname;
    private final String stMsg;
    private final String profileOriginalName;
    private final String profilePath;
    private final ShowInfoFlagsResponse showInfo;

    @Builder
    public MypageModifyResponse(Member member, ShowInfoFlagsResponse showInfo) {
        MemberId = member.getMemberId();
        nickname = member.getNickname();
        stMsg = member.getStMsg();
        profileOriginalName = member.getProfileOriginalName();
        profilePath = member.getProfilePath();
        this.showInfo = showInfo;
    }
}
