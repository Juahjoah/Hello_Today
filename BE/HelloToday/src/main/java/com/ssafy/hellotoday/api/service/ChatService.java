package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.chat.ChatMessage;
import com.ssafy.hellotoday.common.util.chat.RedisPublisher;
import com.ssafy.hellotoday.common.util.constant.MessageType;
import com.ssafy.hellotoday.db.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final RedisPublisher redisPublisher;
    private final ChatRepository chatRepository;

    public void sendMsgToSub(ChatMessage chatMessage, int roomId) {
        if (MessageType.ENTER.equals(chatMessage.getType())) {
//            chatRepository.enterChatRoom(roomId);
            chatMessage.setContent(chatMessage.getSenderId() + "님이 입장하셨습니다.");
        }

        redisPublisher.publish(chatRepository.getTopic(roomId), chatMessage);
    }
}
