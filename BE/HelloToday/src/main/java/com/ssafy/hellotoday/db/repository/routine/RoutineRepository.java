package com.ssafy.hellotoday.db.repository.routine;

import com.ssafy.hellotoday.db.entity.routine.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Integer> {
    List<Routine> findByMember_MemberId(Integer memberId);
    List<Routine> findByActiveFlag(byte i);
    List<Routine> findByActiveFlagAndEndDate(byte b, LocalDate date);
}
