package com.ssafy.hellotoday.db.repository.mypage;

import com.ssafy.hellotoday.db.entity.mypage.Dday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DdayRepository extends JpaRepository<Dday, Integer> {
    List<Dday> findByMember_MemberId(Integer memberId);
    @Query("select d from Dday d join fetch d.member where d.ddayId = :ddayId")
    Optional<Dday> findByIdWithMember(int ddayId);
}
