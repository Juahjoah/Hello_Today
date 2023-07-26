package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.Follow;
import com.ssafy.hellotoday.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);

    @Query("select f from Follow f join fetch f.follower where f.following.memberId = :memberId")
    List<Follow> findAllByFollowing(int memberId);
}
