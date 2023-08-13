package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.MeetingRoomPageDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomCreateResponseDto;
import com.ssafy.hellotoday.api.service.MeetingRoomService;
import com.ssafy.hellotoday.api.service.OpenviduService;
import com.ssafy.hellotoday.jwt.MemberDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Meeting Room", description = "미팅룸 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class MeetingRoomController {
    private final OpenviduService openviduService;
    private final MeetingRoomService meetingRoomService;

    /**
     * 미팅룸을 생성하고 참여하기 위한 세션 아이디, 토큰을 반환
     *
     * @return 미팅룸 아이디, 세션 아이디, 토큰 리턴
     */
    @Operation(
            summary = "미티룸 생성 및 참여",
            description = "미팅룸을 생성하고 참여하기 위한 세션 아이디, 토큰을 반환받는 API")
    @PostMapping
    public BaseResponseDto createRoom(@RequestBody(required = false) RoomCreateRequestDto requestDto,
                                      @AuthenticationPrincipal MemberDetailsImpl member) {

        if (requestDto == null) requestDto = new RoomCreateRequestDto();
        BaseResponseDto responseDto = openviduService.createRoom(requestDto);

        String sessionId = ((RoomCreateResponseDto) responseDto.getData()).getSessionId();
        ((RoomCreateResponseDto) responseDto.getData())
                .setRoomId(meetingRoomService.saveRoomInfo(member.getUser(), requestDto, sessionId));

        return responseDto;
    }

    /**
     * 미팅룸에 참여하기 위한 토큰을 반환
     *
     * @param roomId 미팅룸 아이디
     * @return 미팅룸에 연결을 할 수 있는 토큰 리턴
     */
    @Operation(
            summary = "미팅룸 참여",
            description = "미팅룸에 참여하기 위한 토큰을 반환받는 API")
    @GetMapping("/{roomId}/connections")
    public BaseResponseDto joinRoom(@PathVariable("roomId") int roomId) {

        return openviduService.joinRoom(roomId);
    }

    @Operation(
            summary = "미팅룸 목록 조회",
            description = "현재 개설되어 있는 미팅룸 목록을 조회하는 API")
    @GetMapping("/list")
    public MeetingRoomPageDto roomList(@RequestParam(required = false, defaultValue = "1", value = "page")int page,
                                       @RequestParam(required = false, defaultValue = "6", value = "size")int size) {

        return openviduService.roomList(page - 1, size);
    }

    @Operation(
            summary = "미팅룸 퇴장",
            description = "미팅룸을 퇴장하고, 마지막 사람이 퇴장했을 때 미팅룸 세션을 닫는 API")
    @DeleteMapping("/{roomId}")
    public BaseResponseDto deleteConnection(@PathVariable("roomId") int roomId) {

        return openviduService.deleteConnection(roomId);
    }

    @Operation(
            summary = "미팅룸에서 루틴 진행 도움 질문 조회",
            description = "미티룸에서 루틴 진행에 도움이 되는 멘트를 조회하는 API")
    @GetMapping("/{roomId}/question")
    public BaseResponseDto getQuestion(@PathVariable("roomId") int roomId) {

        return meetingRoomService.getQuestion(roomId);
    }
}
