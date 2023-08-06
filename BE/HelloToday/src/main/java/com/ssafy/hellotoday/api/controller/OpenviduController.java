package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.service.OpenviduService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/room")
public class OpenviduController {
    private final OpenviduService openviduService;

    /**
     * 방을 생성하고 참여하기 위한 세션 아이디, 토큰을 반환
     * @return 세션 아이디, 토큰 리턴
     */
    @PostMapping
    public BaseResponseDto createRoom(@RequestBody(required = false) RoomCreateRequestDto requestDto) {
        if (requestDto == null) requestDto = new RoomCreateRequestDto();
        return openviduService.createRoom(requestDto);
    }

    /**
     * 방에 참여하기 위한 토큰을 반환
     * @param sessionId 세션 아이디
     * @return 방에 연결을 할 수 있는 토큰 리턴
     */
    @GetMapping("/{sessionId}/connections")
    public BaseResponseDto joinRoom(@PathVariable("sessionId") String sessionId) {
        return openviduService.joinRoom(sessionId);
    }
}
