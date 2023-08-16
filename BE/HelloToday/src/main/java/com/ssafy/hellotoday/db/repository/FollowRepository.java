package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.db.entity.Follow;
import com.ssafy.hellotoday.db.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);

    @Query(
            value = "select f " +
                    "from Follow f " +
                    "join fetch f.follower " +
                    "where f.following.memberId = :memberId " +
                    "order by f.follower.nickname",
            countQuery = "select f from Follow f where f.following.memberId = :memberId")
    Page<Follow> findAllByFollowing(int memberId, Pageable pageable);

    @Query(
            value = "select f " +
                    "from Follow f " +
                    "join fetch f.following " +
                    "where f.follower.memberId = :memberId order by f.following.nickname",
            countQuery = "select f from Follow f where f.follower.memberId = :memberId")
    Page<Follow> findAllByFollower(int memberId, Pageable pageable);
}
