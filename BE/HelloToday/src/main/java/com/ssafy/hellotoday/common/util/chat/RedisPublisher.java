package com.ssafy.hellotoday.common.util.chat;

import com.ssafy.hellotoday.api.dto.chat.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, Message message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
}
