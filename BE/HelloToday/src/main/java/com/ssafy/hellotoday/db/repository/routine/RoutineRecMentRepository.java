package com.ssafy.hellotoday.db.repository.routine;

import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RoutineRecMentRepository extends JpaRepository<RecommendMent, Integer>  {
    Long countByRoutineBigCat_RoutineBigCatId(Integer categoryId);
    List<RecommendMent> findByRoutineBigCat_RoutineBigCatId(Integer categoryId, PageRequest pageRequest);
}
