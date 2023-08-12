package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.MeetingRoom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Integer> {
    List<MeetingRoom> findBySessionIdInOrderByCreatedDateDesc(List<String> sessionIds, Pageable pageable);

    @Query("select m from MeetingRoom m join fetch m.question where m.meetingRoomId = :roomId")
    Optional<MeetingRoom> findByIdWithQuestionId(int roomId);
}
