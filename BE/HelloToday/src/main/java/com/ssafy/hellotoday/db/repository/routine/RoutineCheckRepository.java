package com.ssafy.hellotoday.db.repository.routine;

import com.ssafy.hellotoday.db.entity.routine.RoutineCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RoutineCheckRepository extends JpaRepository<RoutineCheck, Integer> {
    RoutineCheck findByRoutineCheckId(Integer routineCheckId);

    @Query(value = "select a from RoutineCheck a " +
            "join fetch RoutineDetailCat.routineDetailCatId " +
            "join fetch Routine.routineId " + 
            "join fetch Member.memberId where Member.memberId = :memberId and a.checkDate = :checkDate"
            , nativeQuery = true)
    List<RoutineCheck> findByMemberIdAndCheckDate(Integer memberId, LocalDateTime checkDate);

}

