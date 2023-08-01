package com.ssafy.hellotoday.api.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.routine.RoutineCheckDto;
import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineCheckRequestDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineRequestDto;
import com.ssafy.hellotoday.api.dto.routine.response.*;
import com.ssafy.hellotoday.common.util.constant.RoutineEnum;
import com.ssafy.hellotoday.db.entity.routine.*;
import com.ssafy.hellotoday.db.repository.routine.RoutineCheckRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRecMentRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineDetailRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineCheck.routineCheck;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetail.routineDetail;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetailCat.routineDetailCat;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RoutineService {
    @Value("${image.path}")
    private String uploadDir;
    private final RoutineDetailRepository routineDetailRepository;
    private final RoutineRecMentRepository routineRecMentRepository;
    private final RoutineRepository routineRepository;
    private final JPAQueryFactory queryFactory;
    private final RoutineCheckRepository routineCheckRepository;


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
            for (int i = 1; i < 8; i++) {
                routineDetailCat.addRoutineCheck(
                        RoutineCheck.createRoutineCheck(i, null, null, null, routineDetailCat, null));
            }

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

    /**
     * 사용자가 진행중인 루틴이 있는지에 대한 activeFlag와 진행중인 루틴이 있으면 routineDetailCat에 대한 인증 내역들 반환
     *
     * @param memberId
     * @return
     */
    public RoutinePrivateCheckResponseDto getPrivateRoutineCheck(Integer memberId) {
        RoutinePrivateCheckResponseDto routinePrivateCheckResponseDto = null;
        List<RoutineCheckResponseDto> resultlist = new ArrayList<>();
        Routine currentRoutine = null;

        try {
            currentRoutine = queryFactory.selectFrom(routine)
                    .where(routine.member.memberId.eq(memberId)
                            .and(routine.activeFlag.eq((byte) 1))).fetchFirst();

            List<Integer> routiuneDetailCatIds = queryFactory.selectDistinct(routineDetailCat.routineDetailCatId)
                    .from(routineCheck)
                    .where(routineDetailCat.routine.routineId.eq(currentRoutine.getRoutineId())).fetch();

            for (Integer routineDetailCatId : routiuneDetailCatIds) {

                List<RoutineCheckDto> fetch = queryFactory
                        .select(Projections.constructor(RoutineCheckDto.class, routineCheck))
                        .from(routineCheck)
                        .where(routineCheck.routineDetailCat.routineDetailCatId.eq(routineDetailCatId)).fetch();

                RoutineDetailDto routineDetailDto = queryFactory.select(Projections.constructor(RoutineDetailDto.class, routineDetail))
                        .from(routineDetail)
                        .where(routineDetail.routineDetailId.eq(
                                queryFactory.select(routineDetailCat.routineDetail.routineDetailId)
                                        .from(routineDetailCat)
                                        .where(routineDetailCat.routineDetailCatId.eq(routineDetailCatId)).fetchFirst()
                        )).fetchFirst();

                resultlist.add(new RoutineCheckResponseDto(routineDetailDto, fetch));
            }

            routinePrivateCheckResponseDto = new RoutinePrivateCheckResponseDto((byte) 1, resultlist);
        } catch (Exception e) {
            routinePrivateCheckResponseDto = new RoutinePrivateCheckResponseDto((byte) 0, null);
        }

        return routinePrivateCheckResponseDto;
    }

    public void checkPrivateRoutine(RoutineCheckRequestDto routineCheckRequestDto) {
        RoutineCheck routineCheck = routineCheckRepository.findByRoutineCheckId(routineCheckRequestDto.getRoutineCheckDto().getRoutineCheckId());

        System.out.println(">>" + uploadDir);

//        MultipartFile file = routineCheckRequestDto.getRoutineCheckDto().getFile();
//        String fullPath = uploadDir + file.getOriginalFilename();
//
//        System.out.println(">>" + fullPath);
//
//        try{
//            file.transferTo(new File(fullPath));
//
//        } catch (Exception e) {
//
//        }
//        routineCheck.update(routineCheck, fullPath);
    }
}
