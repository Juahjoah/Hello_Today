package com.ssafy.hellotoday.db.repository.mypage;

import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheerMessageRepository extends JpaRepository<CheerMessage, Integer> {
    List<CheerMessage> findByMember_MemberId(Integer memberId, PageRequest pageable);
}
