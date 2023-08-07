package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.MeetingRoomDto;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomCreateResponseDto;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.OpenviduErrorEnum;
import com.ssafy.hellotoday.common.exception.validator.OpenviduValidator;
import com.ssafy.hellotoday.common.util.constant.OpenviduResponseEnum;
import com.ssafy.hellotoday.db.entity.MeetingRoom;
import com.ssafy.hellotoday.db.repository.MeetingRoomRepository;
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
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class OpenviduService {
    private final OpenviduValidator openviduValidator;
    private final MeetingRoomRepository meetingRoomRepository;

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

    public BaseResponseDto joinRoom(int roomId) {
        MeetingRoom room = meetingRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalStateException("미팅룸 조회 실패"));
        Session session = openvidu.getActiveSession(room.getSessionId());
        openviduValidator.checkSession(session, room.getSessionId());

        Connection connection = createConnection(session);

        RoomCreateResponseDto response = RoomCreateResponseDto.builder()
                .sessionId(room.getSessionId())
                .token(connection.getToken())
                .build();
        response.setRoomId(roomId);

        return BaseResponseDto.builder()
                .success(true)
                .message(OpenviduResponseEnum.SUCCESS_GET_TOKEN.getName())
                .data(response)
                .build();
    }

    private RecordingProperties createRecordingProperties(RoomCreateRequestDto requestDto) {
        return new RecordingProperties.Builder()
                .hasAudio(requestDto.isAudio())
                .hasVideo(requestDto.isVideo())
                .build();
    }

    public List<MeetingRoomDto> roomList() {
        List<Session> activeSessions = openvidu.getActiveSessions();

        List<String> sessionIds = activeSessions.stream().map(Session::getSessionId).collect(Collectors.toList());
        List<MeetingRoom> rooms = meetingRoomRepository.findBySessionIdIn(sessionIds);
        return rooms.stream().map(meetingRoom -> MeetingRoomDto.builder()
                        .roomId(meetingRoom.getMeetingRoomId())
                .memberId(meetingRoom.getMember().getMemberId())
                .sessionId(meetingRoom.getSessionId())
                .name(meetingRoom.getName())
                .description(meetingRoom.getDescription())
                .memberLimit(meetingRoom.getMemberLimit())
                .createdDate(meetingRoom.getCreatedDate())
                .modifiedDate(meetingRoom.getModifiedDate())
                .build())
                .collect(Collectors.toList());
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
