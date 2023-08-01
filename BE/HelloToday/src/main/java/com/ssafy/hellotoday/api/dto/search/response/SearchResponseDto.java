package com.ssafy.hellotoday.api.dto.search.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchResponseDto {
    private String email;
    private String nickname;

    @Builder
    public SearchResponseDto(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }
}
