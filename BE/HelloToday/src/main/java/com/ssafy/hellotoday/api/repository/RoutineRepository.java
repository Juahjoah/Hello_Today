package com.ssafy.hellotoday.api.repository;

import com.ssafy.hellotoday.db.entity.routine.RoutineDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<RoutineDetail, Integer> {
    List<RoutineDetail> findByRoutineBigCat_RoutineBigCatId(Integer catId);
}