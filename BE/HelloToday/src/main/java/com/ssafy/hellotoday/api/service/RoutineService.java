package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.request.routine.RoutineRequestDto;
import com.ssafy.hellotoday.api.response.routine.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.repository.routine.RoutineRecMentRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineDetailRepository;
import com.ssafy.hellotoday.api.response.routine.RoutineDetailResponseDto;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RoutineService {

    private final RoutineDetailRepository routineDetailRepository;
    private final RoutineRecMentRepository routineRecMentRepository;
    private final RoutineRepository routineRepository;

    public List<RoutineDetailResponseDto> detailRoutine(Integer categoryId) {
        return routineDetailRepository.findByRoutineBigCat_RoutineBigCatId(categoryId).stream()
                .map(routineDetail -> new RoutineDetailResponseDto(routineDetail))
                .collect(Collectors.toList());
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

    public void makeRoutine(RoutineRequestDto routineRequestDto) {
//        Routine routine = routineRequestDto
//        routineRepository.save(routine);
    }
}
