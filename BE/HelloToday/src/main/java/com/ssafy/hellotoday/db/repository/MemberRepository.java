package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.Social;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    List<Member> findByNicknameContaining(String nickname);

    Optional<Member> findByEmail(String email);

    Optional<Member> findBySocialId(String socialId);

    Optional<Member> findByEmailAndSocialType(String email, Social socialType);
}
