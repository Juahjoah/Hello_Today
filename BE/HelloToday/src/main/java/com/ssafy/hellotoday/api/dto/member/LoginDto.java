package com.ssafy.hellotoday.api.dto.member;

import com.ssafy.hellotoday.db.entity.Social;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginDto {

    private Integer memberId;
    private String socialId;
    private Social socialType;
    private String nickname;
    private boolean firstLogin;

    @Builder
    public LoginDto(Integer memberId, String socialId, Social socialType, String nickname, boolean firstLogin) {
        this.memberId = memberId;
        this.socialId = socialId;
        this.socialType = socialType;
        this.nickname = nickname;
        this.firstLogin = firstLogin;
    }
}
