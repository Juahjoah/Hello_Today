package com.ssafy.hellotoday.api.response;

import com.ssafy.hellotoday.common.util.constant.HttpStatusEnum;
import lombok.Builder;

public class BaseResponseDto {
    private HttpStatusEnum status;
    private String message;
    private Object data;

    @Builder
    public BaseResponseDto(HttpStatusEnum status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
