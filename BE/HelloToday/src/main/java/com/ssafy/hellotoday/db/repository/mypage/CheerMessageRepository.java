package com.ssafy.hellotoday.db.repository.mypage;

import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CheerMessageRepository extends JpaRepository<CheerMessage, Integer> {
    @Query("select c from CheerMessage c join fetch c.member where c.cheerMessageId = :cheerMessageId")
    Optional<CheerMessage> findByIdWithMember(int cheerMessageId);

    List<CheerMessage> findByMember_MemberIdOrderByCreatedDateDesc(Integer memberId);
}
