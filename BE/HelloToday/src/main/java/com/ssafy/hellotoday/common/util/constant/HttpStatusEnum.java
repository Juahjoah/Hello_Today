package com.ssafy.hellotoday.common.util.constant;

public enum HttpStatusEnum {

    OK(200, "OK"),
    BAD_REQUEST(400, "BAD_REQUEST"),
    NOT_FOUND(404, "NOT_FOUND"),
    INTERNAL_SERVER_ERROR(500, "INTERNAL_SERVER_ERROR"),
    FORBIDDEN(403, "FORBIDDEN");

    int statusCode;
    String code;

    HttpStatusEnum(int statusCode, String code) {
        this.statusCode = statusCode;
        this.code = code;
    }
}
