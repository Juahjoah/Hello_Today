package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.OpenviduErrorEnum;
import io.openvidu.java.client.Session;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class OpenviduValidator {

    public void checkSession(Session session, String sessionId) {
        if (session == null) {
            throw CustomException.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .code(OpenviduErrorEnum.GET_SESSION_FAILED.getCode())
                    .message(OpenviduErrorEnum.GET_SESSION_FAILED.getMessage() + sessionId)
                    .build();
        }
    }
}
