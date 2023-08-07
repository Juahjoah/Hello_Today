package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.api.dto.meetingroom.MeetingRoomDto;
import com.ssafy.hellotoday.common.util.chat.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Repository
public class ChatRepository {
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;
    private static final String CHAT_ROOMS = "CHAT_ROOMS";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, MeetingRoomDto> opsHashMeetingRoom;
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        opsHashMeetingRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    public List<MeetingRoomDto> findAllRoom() {
        return opsHashMeetingRoom.values(CHAT_ROOMS);
    }

    public MeetingRoomDto findMeetingRoomById(String id) {
        return opsHashMeetingRoom.get(CHAT_ROOMS, id);
    }

    public MeetingRoomDto createMeetingRoom(String name) {
//        MeetingRoomDto room;
        return null;
    }
//    public void enterChatRoom(String roomId) {
//        ChannelTopic topic = topics.get(roomId);
//        if (topic == null) {
//            topic = new ChannelTopic(roomId);
//
//        }
//    }

    public ChannelTopic getTopic(int roomId) {
        return topics.get(roomId);
    }
}
