package com.ssafy.hellotoday.common.util.constant;

import lombok.Getter;

@Getter
public enum SearchKeyEnum {
    NICKNAME("닉네임"),
    TAG("태그");

    private final String name;

    SearchKeyEnum(String name) {
        this.name = name;
    }
}
