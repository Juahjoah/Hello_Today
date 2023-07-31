package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineRequestDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineDetailResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import com.ssafy.hellotoday.db.repository.routine.RoutineRecMentRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineDetailRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
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

    private final RoutineDetailRepository routineDetailRepository;
    private final RoutineRecMentRepository routineRecMentRepository;
    private final RoutineRepository routineRepository;

    public List<RoutineDetailResponseDto> detailRoutine() {
        List<RoutineDetailResponseDto> list = new ArrayList<>();
        list.add(new RoutineDetailResponseDto(1, detailRoutine(1)));
        list.add(new RoutineDetailResponseDto(2, detailRoutine(2)));
        list.add(new RoutineDetailResponseDto(3, detailRoutine(3)));

        return list;
    }

    public List<RoutineDetailDto> detailRoutine(Integer categoryId) {
        return routineDetailRepository.findByRoutineBigCat_RoutineBigCatId(categoryId).stream()
                .map(RoutineDetailDto::new)
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

    public void makeRoutine(RoutineRequestDto routineRequestDto) {
//        routineRepository.save(routineRequestDto.toEntity());
//        Routine routine = routineRequestDto
//        routineRepository.save(routine);
    }
}
