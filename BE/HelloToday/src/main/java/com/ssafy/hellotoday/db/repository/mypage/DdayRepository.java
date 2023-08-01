package com.ssafy.hellotoday.db.repository.mypage;

import com.ssafy.hellotoday.db.entity.mypage.Dday;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DdayRepository extends JpaRepository<Dday, Integer> {
}
