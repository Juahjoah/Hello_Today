package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineRequestDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineDetailResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import com.ssafy.hellotoday.api.response.routine.RoutinePrivateCheckResponseDto;
import com.ssafy.hellotoday.common.util.constant.RoutineEnum;
import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.entity.routine.RoutineCheck;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetailCat;
import com.ssafy.hellotoday.db.repository.routine.RoutineRecMentRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineDetailRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
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

    public BaseResponseDto makeRoutine(RoutineRequestDto routineRequestDto) {
        Routine routine = Routine.createRoutine(
                routineRequestDto.getMemberId()
                , LocalDateTime.now()
                , LocalDateTime.now().plusDays(7)
                , (byte) 1
        );

        List<RoutineDetailDto> routineDetailDtoList = routineRequestDto.getRoutineDetailDtoList();

        for (RoutineDetailDto routineDetailDto : routineDetailDtoList) {
            RoutineDetailCat routineDetailCat = RoutineDetailCat.createRoutineDetailCat(routineDetailDto, routine);
            System.out.println("!!!");
            for (int i = 1; i < 8; i++) {
                routineDetailCat.addRoutineCheck(
                        RoutineCheck.builder()
                                .checkDaySeq(i)
                                .content(null)
                                .imgPath(null)
                                .imgOriginalName(null)
                                .routineDetailCat(routineDetailCat)
                                .build());
            }

            System.out.println("???");
            routine.addRoutineDetailCat(routineDetailCat);
        }

        routineRepository.save(routine);

        List<RoutineDetailCat> routineDetailCatList = RoutineResponseDto.builder().routineDetailCatList(routine.getRoutineDetailCats()).build().getRoutineDetailCatList();

        return BaseResponseDto.builder()
                .success(true)
                .message(RoutineEnum.SUCCESS_MAKE_ROTUINE.getName())
                .data(RoutineResponseDto.builder()
                        .routineId(routine.getRoutineId())
                        .memberId(routine.getMember().getMemberId())
//                        .routineDetailCatList(routineDetailCatList)
                        .startDate(routine.getStartDate())
                        .endDate(routine.getEndDate())
                        .activeFlag(routine.getActiveFlag())
                        .build())
                .build();
    }

    public RoutinePrivateCheckResponseDto getPrivateRoutineCheck(Integer memberId) {
        return null;
    }
}
