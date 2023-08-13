package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.MeetingRoomDto;
import com.ssafy.hellotoday.api.dto.meetingroom.SessionInfo;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.MeetingRoomPageDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomCreateResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomOutResponse;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.BaseErrorEnum;
import com.ssafy.hellotoday.common.exception.message.MeetingRoomErrorEnum;
import com.ssafy.hellotoday.common.exception.message.OpenviduErrorEnum;
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
                .orElseThrow(() -> CustomException.builder()
                        .status(HttpStatus.BAD_REQUEST)
                        .code(MeetingRoomErrorEnum.ROOM_NOT_EXIST.getCode())
                        .message(MeetingRoomErrorEnum.ROOM_NOT_EXIST.getMessage())
                        .build());
        try {
            openvidu.fetch();
            Session session = openvidu.getActiveSession(room.getSessionId());
            if (session.getActiveConnections().size() >= room.getMemberLimit()) {
                throw CustomException.builder()
                        .status(HttpStatus.BAD_REQUEST)
                        .code(MeetingRoomErrorEnum.CANNOT_ENTER_OVER_MEMBER_LIMIT.getCode())
                        .message(MeetingRoomErrorEnum.CANNOT_ENTER_OVER_MEMBER_LIMIT.getMessage())
                        .build();
            }
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
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(OpenviduErrorEnum.FAILED_ROOM_INFO_FETCH.getCode())
                    .message(OpenviduErrorEnum.FAILED_ROOM_INFO_FETCH.getMessage())
                    .build();
        }

    }

    public MeetingRoomPageDto roomList(int page, int size) {
        if (page < 0) throw CustomException.builder()
                .status(HttpStatus.BAD_REQUEST)
                .code(BaseErrorEnum.INVALID_PAGE_NUM.getCode())
                .message(BaseErrorEnum.INVALID_PAGE_NUM.getMessage())
                .build();

        try {
            openvidu.fetch();
            List<Session> activeSessions = openvidu.getActiveSessions();

            List<SessionInfo> sessionInfos = getSessionInfos(activeSessions);
            List<String> sessionIds = sessionInfos.stream().map(SessionInfo::getSessionId).collect(Collectors.toList());

            Pageable pageable = PageRequest.of(page, size);
            Page<MeetingRoom> rooms = meetingRoomRepository
                    .findBySessionIdInOrderByCreatedDateDesc(sessionIds, pageable);

            List<MeetingRoomDto> response = new ArrayList<>();

            for (int i = 0; i < rooms.getContent().size(); i++) {
                MeetingRoom meetingRoom = rooms.getContent().get(i);
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
            return MeetingRoomPageDto.builder()
                    .totalPages(rooms.getTotalPages())
                    .totalRooms(rooms.getTotalElements())
                    .rooms(response)
                    .build();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(OpenviduErrorEnum.FAILED_ROOM_INFO_FETCH.getCode())
                    .message(OpenviduErrorEnum.FAILED_ROOM_INFO_FETCH.getMessage())
                    .build();
        }
    }

    @Transactional
    public BaseResponseDto deleteConnection(int roomId) {
        MeetingRoom room = meetingRoomRepository.findById(roomId)
                .orElseThrow(() -> CustomException.builder()
                        .status(HttpStatus.BAD_REQUEST)
                        .code(MeetingRoomErrorEnum.ROOM_NOT_EXIST.getCode())
                        .message(MeetingRoomErrorEnum.ROOM_NOT_EXIST.getMessage())
                        .build());

        try {
            openvidu.fetch();
            Session session = openvidu.getActiveSession(room.getSessionId());
            // 인원 수가 1이라면 세션까지 닫기
            if (session.getActiveConnections().size() <= 0) {
                session.close();
                room.updateActiveFlag(false);
                return BaseResponseDto.builder()
                        .success(true)
                        .message(MeetingRoomResponseEnum.CLOSE_MEETINGROOM.getName())
                        .data(RoomOutResponse.builder()
                                .code(MeetingRoomResponseEnum.CLOSE_MEETINGROOM.getCode())
                                .build())
                        .build();
            } else {
                return BaseResponseDto.builder()
                        .success(true)
                        .message(MeetingRoomResponseEnum.EXIT_MEETINGROOM.getName())
                        .data(RoomOutResponse.builder()
                                .code(MeetingRoomResponseEnum.EXIT_MEETINGROOM.getCode())
                                .build())
                        .build();
            }


            // 아니라면 커넥션만 끊기
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
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

    private List<SessionInfo> getSessionInfos(List<Session> activeSessions) {
        return activeSessions.stream()
                .map(session -> SessionInfo.builder()
                        .sessionId(session.getSessionId())
                        .joinCnt(session.getActiveConnections().size())
                        .build())
                .collect(Collectors.toList());
    }
}
