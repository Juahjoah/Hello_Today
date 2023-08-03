package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.chat.ChatMessage;
import com.ssafy.hellotoday.api.service.ChatService;
import com.ssafy.hellotoday.common.util.chat.RedisPublisher;
import com.ssafy.hellotoday.common.util.constant.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {
    private final RedisPublisher redisPublisher;
    private final ChatService chatService;

    @MessageMapping("/pub/{roomId}")
    public void message(@Payload ChatMessage chatMessage, @DestinationVariable int roomId) {
        chatService.sendMsgToSub(chatMessage, roomId);
    }

//    @MessageMapping("/enter/{roomId}")
//    public void enter(@Payload ChatMessage chatMessage, @DestinationVariable int roomId) {
//        log.info("입장 요청: " + chatMessage.toString());
//
//        // service: 사용자 토큰 유효성 검사, 방 정보 검사? 후 입장 처리
//        chatMessage.newConnect();
//
//        log.info("입장 완료: /" + roomId + " 구독한 사람들에게 입장 알림");
//        simpMessagingTemplate.convertAndSend("/sub/" + roomId, chatMessage);
//    }
}
