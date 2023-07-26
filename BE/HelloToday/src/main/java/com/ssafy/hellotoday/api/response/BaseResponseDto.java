package com.ssafy.hellotoday.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BaseResponseDto {
    private boolean success;
    private String message;
    private Object data;

    @Builder
    public BaseResponseDto(boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
