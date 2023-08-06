package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.MeetingRoomQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRoomQuestionRepository extends JpaRepository<MeetingRoomQuestion, Integer> {
}
