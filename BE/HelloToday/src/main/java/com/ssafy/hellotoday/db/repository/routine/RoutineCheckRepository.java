package com.ssafy.hellotoday.db.repository.routine;

import com.ssafy.hellotoday.db.entity.routine.RoutineCheck;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface RoutineCheckRepository extends JpaRepository<RoutineCheck, Integer> {
    RoutineCheck findByRoutineCheckId(Integer routineCheckId);
}

