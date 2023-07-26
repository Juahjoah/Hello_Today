package com.ssafy.hellotoday.db.repository.routine;

import com.ssafy.hellotoday.db.entity.routine.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoutineRepository extends JpaRepository<Routine, Integer> {
}
