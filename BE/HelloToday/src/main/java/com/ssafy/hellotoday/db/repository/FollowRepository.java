package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.Follow;
import com.ssafy.hellotoday.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);
}
