package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.api.dto.member.response.ShowInfoFlagsResponse;
import com.ssafy.hellotoday.db.entity.ShowInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ShowInfoRepository extends JpaRepository<ShowInfo, Integer> {

    @Query("select s from ShowInfo s join fetch s.member where s.showInfoId=:id")
    Optional<ShowInfo> findByIdWithMember(Integer id);
}
