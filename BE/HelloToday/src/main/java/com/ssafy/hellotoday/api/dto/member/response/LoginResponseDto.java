package com.ssafy.hellotoday.api.dto.member.response;

import lombok.Builder;
import lombok.Getter;

import javax.naming.ldap.PagedResultsControl;

@Getter
public class LoginResponseDto {
    private Integer memberId;
    private String message;
    private boolean firstLogin;

    @Builder
    public LoginResponseDto(String message, Integer memberId, boolean firstLogin) {
        this.message = message;
        this.memberId = memberId;
        this.firstLogin = firstLogin;
    }
}
