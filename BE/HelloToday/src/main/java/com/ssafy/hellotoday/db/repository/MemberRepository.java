package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    List<Member> findByNicknameContaining(String nickname);
}
