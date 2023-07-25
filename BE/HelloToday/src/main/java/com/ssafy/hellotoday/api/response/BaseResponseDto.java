package com.ssafy.hellotoday.api.response;

import com.ssafy.hellotoday.common.util.constant.HttpStatusEnum;

public class BaseResponseDto {
    private HttpStatusEnum status;
    private String message;
    private Object data;
}
