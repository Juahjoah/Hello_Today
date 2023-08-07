package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.MeetingRoomDto;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.RoomCreateResponseDto;
import com.ssafy.hellotoday.api.service.MeetingRoomService;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.api.service.OpenviduService;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class MeetingRoomController {
    private final OpenviduService openviduService;
    private final MeetingRoomService meetingRoomService;
    private final MemberService memberService;

    /**
     * 방을 생성하고 참여하기 위한 세션 아이디, 토큰을 반환
     * @return 미팅룸 아이디, 세션 아이디, 토큰 리턴
     */
    @PostMapping
    public BaseResponseDto createRoom(@RequestBody(required = false) RoomCreateRequestDto requestDto,
                                      HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        Member member = memberService.findMemberByJwtToken(token);

        if (requestDto == null) requestDto = new RoomCreateRequestDto();
        BaseResponseDto responseDto = openviduService.createRoom(requestDto);

        String sessionId = ((RoomCreateResponseDto) responseDto.getData()).getSessionId();
        ((RoomCreateResponseDto) responseDto.getData())
                .setRoomId(meetingRoomService.saveRoomInfo(member, requestDto, sessionId));

        return responseDto;
    }

    /**
     * 방에 참여하기 위한 토큰을 반환
     * @param roomId 세션 아이디
     * @return 방에 연결을 할 수 있는 토큰 리턴
     */
    @GetMapping("/{roomId}/connections")
    public BaseResponseDto joinRoom(@PathVariable("roomId") int roomId) {
        return openviduService.joinRoom(roomId);
    }

    @GetMapping("/list")
    public List<MeetingRoomDto> roomList() {
        return openviduService.roomList();
    }

    @GetMapping("/{roomId}/question")
    public BaseResponseDto getQuestion(@PathVariable("roomId") int roomId) {
        return meetingRoomService.getQuestion(roomId);
    }

    @DeleteMapping("/{roomId}")
    public BaseResponseDto deleteConnection(@PathVariable("roomId") int roomId) {
        return meetingRoomService.deleteConnection(roomId);
    }
}
