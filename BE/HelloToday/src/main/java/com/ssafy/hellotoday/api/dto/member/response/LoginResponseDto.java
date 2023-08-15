package com.ssafy.hellotoday.api.dto.member.response;

import lombok.Builder;
import lombok.Getter;

import javax.naming.ldap.PagedResultsControl;

@Getter
public class LoginResponseDto {
    private Integer memberId;
    private String message;
    private String nickname;
    private boolean firstLogin;

    @Builder
    public LoginResponseDto(Integer memberId, String message, String nickname, boolean firstLogin) {
        this.memberId = memberId;
        this.message = message;
        this.nickname = nickname;
        this.firstLogin = firstLogin;
    }


}
