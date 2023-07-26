package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.response.routine.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import com.ssafy.hellotoday.db.repository.routine.RoutineRecMentRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import com.ssafy.hellotoday.api.response.routine.RoutineDetailResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final RoutineRecMentRepository routineRecMentRepository;

    public List<RoutineDetailResponseDto> detailRoutine(Integer categoryId) {
        return routineRepository.findByRoutineBigCat_RoutineBigCatId(categoryId).stream()
                .map(routineDetail -> new RoutineDetailResponseDto(routineDetail))
                .collect(Collectors.toList());
    }

    public List<RoutineRecMentResponseDto> getRecommendMents() {

        List<RoutineRecMentResponseDto> list = new LinkedList<>();
        list.add(getRecommendMent(1));
        list.add(getRecommendMent(2));
        list.add(getRecommendMent(3));

        return list;
    }

    public RoutineRecMentResponseDto getRecommendMent(Integer categoryId) {
        long qty = routineRecMentRepository.countByRoutineBigCat_RoutineBigCatId(categoryId);
        int idx = (int) (Math.random() * qty);
        RecommendMent recommendMent = null;

        List<RecommendMent> recommendMents = routineRecMentRepository.findByRoutineBigCat_RoutineBigCatId(categoryId, PageRequest.of(idx, 1));

        if (recommendMents != null) {
            recommendMent = recommendMents.get(0);
        }

        return new RoutineRecMentResponseDto(recommendMent);
    }
}
