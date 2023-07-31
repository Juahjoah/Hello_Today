package com.ssafy.hellotoday.oauth2.naver;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NaverMemberDto {

    private String email;
    private String name;
    private String profilePath;
    private String socialId;

    @Builder
    public NaverMemberDto(String email, String name, String profilePath, String socialId) {
        this.email = email;
        this.name = name;
        this.profilePath = profilePath;
        this.socialId = socialId;
    }
}
