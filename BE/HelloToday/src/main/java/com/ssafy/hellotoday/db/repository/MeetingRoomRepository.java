package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.MeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Integer> {
    List<MeetingRoom> findBySessionIdIn(List<String> sessionIds);
}
