package com.ssafy.hellotoday.oauth2.kakao;

import lombok.Builder;
import lombok.Getter;

@Getter
public class KakaoMemberDto {
    private String socialId;
    private String email;
    private String name;
    private String profilePath;

    @Builder
    public KakaoMemberDto(String socialId, String email, String name, String profilePath) {
        this.socialId = socialId;
        this.email = email;
        this.name = name;
        this.profilePath = profilePath;
    }
}
