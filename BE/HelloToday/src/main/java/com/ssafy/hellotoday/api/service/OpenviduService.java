package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.MeetingRoomDto;
import com.ssafy.hellotoday.api.dto.meetingroom.SessionInfo;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.MeetingRoomPageDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomCreateResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomOutResponse;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.OpenviduErrorEnum;
import com.ssafy.hellotoday.common.exception.validator.BaseValidator;
import com.ssafy.hellotoday.common.exception.validator.MeetingRoomValidator;
import com.ssafy.hellotoday.common.exception.validator.OpenviduValidator;
import com.ssafy.hellotoday.common.util.constant.MeetingRoomResponseEnum;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class OpenviduService {
    private final OpenviduValidator openviduValidator;
    private final MeetingRoomRepository meetingRoomRepository;

    private final BaseValidator baseValidator;
    private final MeetingRoomValidator meetingRoomValidator;

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
        Optional<MeetingRoom> roomOptional = meetingRoomRepository.findById(roomId);
        MeetingRoom room = meetingRoomValidator.validMeetingRoom(roomOptional);

        openviduFetch();

        Session session = openvidu.getActiveSession(room.getSessionId());
        openviduValidator.checkSession(session, room.getSessionId());
        openviduValidator.checkUnderMemberLimit(session, room);

        Connection connection = createConnection(session);

        RoomCreateResponseDto response = createRoomResponseDto(roomId, room.getSessionId(), connection.getToken());

        return BaseResponseDto.builder()
                .success(true)
                .message(OpenviduResponseEnum.SUCCESS_GET_TOKEN.getName())
                .data(response)
                .build();
    }

    public MeetingRoomPageDto roomList(int page, int size) {
        baseValidator.checkPageAndSize(page, size);

        openviduFetch();

        List<Session> activeSessions = openvidu.getActiveSessions();

        List<SessionInfo> sessionInfos = getSessionInfos(activeSessions);
        List<String> sessionIds = sessionInfos.stream().map(SessionInfo::getSessionId).collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, size);
        Page<MeetingRoom> rooms = meetingRoomRepository
                .findBySessionIdInOrderByCreatedDateDesc(sessionIds, pageable);

        List<MeetingRoomDto> response = makeMeetingRoomDtoList(rooms.getContent());

        return MeetingRoomPageDto.builder()
                .totalPages(rooms.getTotalPages())
                .totalRooms(rooms.getTotalElements())
                .rooms(response)
                .build();
    }

    @Transactional
    public BaseResponseDto deleteConnection(int roomId) {
        Optional<MeetingRoom> roomOptional = meetingRoomRepository.findById(roomId);
        MeetingRoom room = meetingRoomValidator.validMeetingRoom(roomOptional);

        openviduFetch();
        Session session = openvidu.getActiveSession(room.getSessionId());

        MeetingRoomResponseEnum responseEnum;
        if (session == null || session.getActiveConnections().size() == 0) {
            closeSession(session);
            room.updateActiveFlag(false);
            responseEnum = MeetingRoomResponseEnum.CLOSE_MEETINGROOM;

        } else {
            responseEnum = MeetingRoomResponseEnum.EXIT_MEETINGROOM;
        }

        return BaseResponseDto.builder()
                .success(true)
                .message(responseEnum.getName())
                .data(RoomOutResponse.builder()
                        .code(responseEnum.getCode())
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

    private void openviduFetch() {
        try {
            openvidu.fetch();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            openviduValidator.failedRoomInfoFetch();
        }
    }

    private RoomCreateResponseDto createRoomResponseDto(int roomId, String sessionId, String token) {
        return RoomCreateResponseDto.builder()
                .roomId(roomId)
                .sessionId(sessionId)
                .token(token)
                .build();
    }

    private List<MeetingRoomDto> makeMeetingRoomDtoList(List<MeetingRoom> rooms) {
        List<MeetingRoomDto> response = new ArrayList<>();

        for (MeetingRoom meetingRoom : rooms) {
            int joinCnt = openvidu.getActiveSession(meetingRoom.getSessionId()).getActiveConnections().size();
            response.add(MeetingRoomDto.builder()
                    .roomId(meetingRoom.getMeetingRoomId())
                    .memberId(meetingRoom.getMember().getMemberId())
                    .sessionId(meetingRoom.getSessionId())
                    .name(meetingRoom.getName())
                    .description(meetingRoom.getDescription())
                    .memberLimit(meetingRoom.getMemberLimit())
                    .joinCnt(joinCnt)
                    .createdDate(meetingRoom.getCreatedDate())
                    .modifiedDate(meetingRoom.getModifiedDate())
                    .build());
        }

        return response;
    }

    private void closeSession(Session session) {
        if (session == null) return;

        try {
            session.close();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            openviduValidator.failedClosingSession();
        }
    }

    private List<SessionInfo> getSessionInfos(List<Session> activeSessions) {
        return activeSessions.stream()
                .map(session -> SessionInfo.builder()
                        .sessionId(session.getSessionId())
                        .joinCnt(session.getActiveConnections().size())
                        .build())
                .collect(Collectors.toList());
    }
}
