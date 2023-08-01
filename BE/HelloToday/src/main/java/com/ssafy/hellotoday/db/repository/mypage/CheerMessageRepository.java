package com.ssafy.hellotoday.db.repository.mypage;

import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheerMessageRepository extends JpaRepository<CheerMessage, Integer> {
}
