package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.repository.RoutineRepository;
import com.ssafy.hellotoday.api.response.routine.RoutineDetailResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RoutineService {

    private final RoutineRepository routineRepository;

    public List<RoutineDetailResponseDto> detailRoutine(Integer catId) {
        return routineRepository.findByRoutineBigCat_RoutineBigCatId(catId).stream()
                .map(routineDetail -> new RoutineDetailResponseDto(routineDetail))
                .collect(Collectors.toList());
    }
}
