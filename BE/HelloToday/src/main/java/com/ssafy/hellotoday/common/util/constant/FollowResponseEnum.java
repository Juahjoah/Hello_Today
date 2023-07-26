package com.ssafy.hellotoday.common.util.constant;

import lombok.Getter;

@Getter
public enum FollowResponseEnum {
    SUCCESS_ENROLL_FOLLOW("팔로우 등록에 성공했습니다.");

    private final String name;

    FollowResponseEnum(String name) {
        this.name = name;
    }
}
