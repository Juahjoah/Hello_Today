package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomCreateResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomJoinResponseDto;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.OpenviduErrorEnum;
import com.ssafy.hellotoday.common.exception.validator.OpenviduValidator;
import com.ssafy.hellotoday.common.util.constant.OpenviduResponseEnum;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Slf4j
@RequiredArgsConstructor
@Service
public class OpenviduService {
    private final OpenviduValidator openviduValidator;

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public BaseResponseDto createRoom(RoomCreateRequestDto requestDto) {
        RecordingProperties recordingProperties = createRecordingProperties(requestDto);
        Session session = createSession(recordingProperties);
        Connection connection = createConnection(session);

        return BaseResponseDto.builder()
                .success(true)
                .message(OpenviduResponseEnum.SUCCESS_CREATE_SESSION.getName())
                .data(RoomCreateResponseDto.builder()
                        .sessionId(session.getSessionId())
                        .token(connection.getToken())
                        .build())
                .build();
    }

    public BaseResponseDto joinRoom(String sessionId) {
        Session session = openvidu.getActiveSession(sessionId);
        openviduValidator.checkSession(session, sessionId);

        Connection connection = createConnection(session);

        return BaseResponseDto.builder()
                .success(true)
                .message(OpenviduResponseEnum.SUCCESS_GET_TOKEN.getName())
                .data(RoomJoinResponseDto.builder()
                        .token(connection.getToken())
                        .build())
                .build();
    }

    private RecordingProperties createRecordingProperties(RoomCreateRequestDto requestDto) {
        return new RecordingProperties.Builder()
                .hasAudio(requestDto.isAudio())
                .hasVideo(requestDto.isVideo())
                .build();
    }

    private Session createSession(RecordingProperties recordingProperties) {
        try {
            SessionProperties sessionProperties = new SessionProperties.Builder()
                    .defaultRecordingProperties(recordingProperties)
                    .build();
            return openvidu.createSession(sessionProperties);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            log.error(e.getMessage());
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(OpenviduErrorEnum.CREATE_SESSION_FAILED.getCode())
                    .message(OpenviduErrorEnum.CREATE_SESSION_FAILED.getMessage())
                    .build();
        }
    }

    private Connection createConnection(Session session) {
        try {
            ConnectionProperties connectionProperties = new ConnectionProperties.Builder().build();
            return session.createConnection(connectionProperties);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            log.error(e.getMessage());
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(OpenviduErrorEnum.CREATE_CONNECTION_FAILED.getCode())
                    .message(OpenviduErrorEnum.CREATE_CONNECTION_FAILED.getMessage())
                    .build();
        }
    }
}
