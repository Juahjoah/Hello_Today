package com.ssafy.hellotoday.db.repository.mypage;

import com.ssafy.hellotoday.db.entity.mypage.Dday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DdayRepository extends JpaRepository<Dday, Integer> {
    List<Dday> findByMember_MemberId(Integer memberId);
}
