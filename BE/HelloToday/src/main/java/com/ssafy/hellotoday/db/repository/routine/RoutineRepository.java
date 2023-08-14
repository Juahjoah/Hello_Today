package com.ssafy.hellotoday.db.repository.routine;

import com.ssafy.hellotoday.db.entity.routine.Routine;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RoutineRepository extends JpaRepository<Routine, Integer> {
    List<Routine> findByMember_MemberId(Integer memberId);
    List<Routine> findByEndDateBeforeAndActiveFlag(LocalDateTime localDateTime, byte b);

    Optional<Routine> findByMember_MemberIdAndActiveFlag(Integer memberId, byte b);

    List<Routine> findByMember_MemberIdOrderByStartDateDesc(Integer memberId, PageRequest pageRequest);
}
