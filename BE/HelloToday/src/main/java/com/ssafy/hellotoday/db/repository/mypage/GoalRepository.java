package com.ssafy.hellotoday.db.repository.mypage;

import com.ssafy.hellotoday.db.entity.mypage.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Integer> {


    @Query("select g from Goal g join fetch g.member where g.member.memberId=:memberId")
    List<Goal> findAllByMemberId(Integer memberId);
}
