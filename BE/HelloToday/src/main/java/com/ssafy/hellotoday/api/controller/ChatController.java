package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.chat.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/pub/{roomId}")
    public void message(@Payload Message message, @DestinationVariable int roomId) {
        log.info("채팅 요청: " + message.toString());

        // service: 사용자 토큰 유효성 검사, 방 정보 검사, redis 저장 등의 작업 후 채팅 처리
        message.newMessage();

        log.info("/" + roomId + " 구독한 사람들에게 채팅 전송");
        simpMessagingTemplate.convertAndSend("/sub/" + roomId, message);
    }

    @MessageMapping("/enter/{roomId}")
    public void enter(@Payload Message message, @DestinationVariable int roomId) {
        log.info("입장 요청: " + message.toString());

        // service: 사용자 토큰 유효성 검사, 방 정보 검사? 후 입장 처리
        message.newConnect();

        log.info("입장 완료: /" + roomId + " 구독한 사람들에게 입장 알림");
        simpMessagingTemplate.convertAndSend("/sub/" + roomId, message);
    }
}
