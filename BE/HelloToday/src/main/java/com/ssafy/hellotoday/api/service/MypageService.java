package com.ssafy.hellotoday.api.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.*;
import com.ssafy.hellotoday.api.dto.mypage.response.*;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.util.constant.MypageEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import com.ssafy.hellotoday.db.entity.mypage.Dday;
import com.ssafy.hellotoday.db.entity.mypage.Goal;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.entity.routine.RoutineCheck;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.mypage.CheerMessageRepository;
import com.ssafy.hellotoday.db.repository.mypage.DdayRepository;
import com.ssafy.hellotoday.db.repository.mypage.GoalRepository;
import com.ssafy.hellotoday.db.repository.querydsl.MypageQueryDslRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MypageService {
    private final CheerMessageRepository cheerMessageRepository;
    private final MemberRepository memberRepository;
    private final DdayRepository ddayRepository;
    private final RoutineRepository routineRepository;
    private final GoalRepository goalRepository;
    private final JPAQueryFactory queryFactory;
    private final MypageQueryDslRepository mypageQueryDslRepository;

    public BaseResponseDto writeCheerMessage(CheerMessageRequestDto cheerMessageRequestDto, Member writer) {
        Member member = getMember(cheerMessageRequestDto.getMemberId());

        CheerMessage cheerMessage = CheerMessage.builder()
                .member(member)
                .writer(writer)
                .content(cheerMessageRequestDto.getContent())
                .build();

        cheerMessageRepository.save(cheerMessage);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_WRITE_CHEER_MESSAGE.getName())
                .data(CheerMessageResponseDto.builder()
                        .writerNickName(writer.getNickname())
                        .memberId(member.getMemberId())
                        .createdDate(cheerMessage.getCreatedDate())
                        .modifiedDate(cheerMessage.getModifiedDate())
                        .content(cheerMessage.getContent())
                        .build())
                .build();
    }

    public BaseResponseDto modifyCheerMessage(CheerMessageModifyRequestDto cheerMessageModifyRequestDto,
                                              Member writer) {
        CheerMessage cheerMessage = cheerMessageRepository
                .findById(cheerMessageModifyRequestDto.getCheerMessageId()).get();
        cheerMessage.update(cheerMessageModifyRequestDto, writer);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_MODIFY_CHEER_MESSAGE.getName())
                .data(CheerMessageResponseDto.builder()
                        .writerNickName(writer.getNickname())
                        .memberId(cheerMessage.getMember().getMemberId())
                        .createdDate(cheerMessage.getMember().getCreatedDate())
                        .modifiedDate(cheerMessage.getModifiedDate())
                        .content(cheerMessage.getContent())
                        .build())
                .build();
    }

    public List<CheerMessageResponseDto> getCheerMessages(Integer memberId) {

        List<CheerMessage> cheerMessageList = cheerMessageRepository.findByMember_MemberIdOrderByCreatedDateDesc(memberId);

        return cheerMessageList.stream()
                .map(CheerMessageResponseDto::new)
                .collect(Collectors.toList());
    }

    public BaseResponseDto deleteCheerMessage(int memberId, int cheerMessageId) {
        CheerMessage cheerMessage = cheerMessageRepository.findByIdWithMember(cheerMessageId)
                .orElseThrow(() -> new IllegalArgumentException("응원 메세지 조회 오류"));

        if (cheerMessage.getWriter().getMemberId() != memberId) throw CustomException.builder()
                .status(HttpStatus.BAD_REQUEST)
                .code(9000)
                .message("삭제 요청자와 응원 메세지 작성자가 일치하지 않습니다.")
                .build();
        cheerMessageRepository.deleteById(cheerMessageId);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_DELETE_CHEER_MESSAGE.getName())
                .build();
    }

    public List<DdayResponseDto> getDdays(Integer memberId) {
        List<Dday> ddayList = ddayRepository.findByMember_MemberId(memberId);

        return ddayList.stream()
                .map(DdayResponseDto::new)
                .sorted(Comparator.comparing(DdayResponseDto::getCalDate).reversed())
                .collect(Collectors.toList());
    }

    public BaseResponseDto writeDday(DdayRequestDto ddayRequestDto, Member member) {

        Dday dday = Dday.builder()
                .member(member)
                .finalDate(ddayRequestDto.getFinalDate())
                .content(ddayRequestDto.getContent())
                .build();

        ddayRepository.save(dday);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_WRITE_DDAY_MESSAGE.getName())
                .data(DdayResponseDto.builder()
                        .memberId(dday.getMember().getMemberId())
                        .finalDate(dday.getFinalDate())
                        .content(dday.getContent())
                        .createdDate(dday.getCreatedDate())
                        .modifiedDate(dday.getModifiedDate())
                        .build())
                .build();
    }

    public BaseResponseDto modifyDday(DdayModifyRequestDto ddayModifyRequestDto, Member member) {

        Dday dday = ddayRepository.findById(ddayModifyRequestDto.getDdayId()).get();

        dday.update(ddayModifyRequestDto, member);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_MODIFY_DDAY_MESSAGE.getName())
                .data(DdayResponseDto.builder()
                        .memberId(dday.getMember().getMemberId())
                        .finalDate(dday.getFinalDate())
                        .content(dday.getContent())
                        .createdDate(dday.getCreatedDate())
                        .modifiedDate(dday.getModifiedDate())
                        .build())
                .build();
    }

    public BaseResponseDto deleteDday(int memberId, int ddayId) {
        Dday dday = ddayRepository.findByIdWithMember(ddayId).orElseThrow(() -> CustomException.builder()
                .status(HttpStatus.BAD_REQUEST)
                .code(9002)
                .message(ddayId + "에 해당하는 디데이를 조회할 수 없습니다.")
                .build());
        if (dday.getMember().getMemberId() != memberId) throw CustomException.builder()
                .status(HttpStatus.BAD_REQUEST)
                .code(9003)
                .message("삭제 요청자와 디데이 작성자가 일치하지 않습니다.")
                .build();
        ddayRepository.deleteById(ddayId);
        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_DELETE_DDAY_MESSAGE.getName())
                .build();
    }

    private Member getMember(Integer memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member.get();
    }

    public List<RoutineResponseDto> getCalendar(Integer memberId) {

        System.out.println("memberId: " + memberId);
        List<Routine> routineList = routineRepository.findByMember_MemberId(memberId);

        return routineList.stream()
                .map(RoutineResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<CalendarHistoryDetailResponseDto> getCalendarRoutineDetail(Integer memberId, LocalDate checkDate) {

        return mypageQueryDslRepository.findCalendarDetailList(memberId, checkDate);
    }

    public List<RoutineHistoryResponseDto> getRoutineHistory(Integer memberId, PageRequest pageRequest) {

        // calendarHistory + 대표 이미지 사진
        // 이미지가 있으면 우선으로 보이게 하도록 설정하는 Case문
        List<Routine> routineList = routineRepository.findByMember_MemberIdOrderByStartDateDesc(memberId, pageRequest);
        List<RoutineHistoryResponseDto> result = new ArrayList<>();

        for (Routine routineItem : routineList) {
            RoutineCheck routineCheck = mypageQueryDslRepository.findRoutineCheckImage(routineItem);

            result.add(RoutineHistoryResponseDto.builder()
                            .routineId(routineItem.getRoutineId())
                            .startDate(routineItem.getStartDate())
                            .endDate(routineItem.getEndDate())
                            .imgPath(routineCheck.getRoutineImagePath())
                            .size(routineRepository.findByMember_MemberId(memberId).size())
                    .build());
        }

        return result;
    }

    public List<RoutineDetailHistoryResponseDto> getRoutineHistoryDetail(Integer routineId) {

        // 일차별로 묶어서 routine_check 했던 것들 list로 반환함
        List<RoutineDetailHistoryResponseDto> result = new ArrayList<>();

        for (int i = 1; i < 8; i++) {
            List<CalendarHistoryDetailResponseDto> routineDetailList =
                    mypageQueryDslRepository.findRoutineDetailList(routineId, i);

            result.add(new RoutineDetailHistoryResponseDto(i, routineDetailList));
        }

        return result;
    }

    public BaseResponseDto writeGoal(Member findMember, GoalRequestDto goalRequestDto) {

        Goal newGoal = Goal.builder()
                .member(findMember)
                .type(goalRequestDto.getType())
                .content(goalRequestDto.getContent())
                .build();
        goalRepository.save(newGoal);
        String resType = checkGoalType(newGoal.getType());


        GoalResponseDto save = GoalResponseDto.builder()
                .goalId(newGoal.getGoalId())
                .memberId(newGoal.getMember().getMemberId())
                .content(newGoal.getContent())
                .type(resType)
                .build();
        return BaseResponseDto.builder()
                .success(true)
                .message(resType + " 목표를 작성하셨습니다")
                .data(save)
                .build();
    }

    public BaseResponseDto updateGoal(Integer goalId, Member findMember, GoalRequestDto goalRequestDto) {

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 유저의 Goal 정보가 없습니다"));

        if (!findMember.equals(goal.getMember())) {
            throw new IllegalArgumentException("잘못된 접근입니다");
        }

        String resType = checkGoalType(goal.getType());

        goal.updateGoal(goalRequestDto);
        GoalResponseDto save = GoalResponseDto.builder()
                .goalId(goal.getGoalId())
                .memberId(goal.getMember().getMemberId())
                .content(goal.getContent())
                .type(resType)
                .build();


        return BaseResponseDto.builder()
                .success(true)
                .message(resType + " 목표를 수정하셨습니다")
                .data(save)
                .build();
    }

    public BaseResponseDto deleteGoal(Integer goalId, Member findMember) {

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new IllegalArgumentException("goal_id " + goalId + "해당하는 회원이 없습니다"));

        if (!findMember.equals(goal.getMember())) {
            throw new IllegalArgumentException("잘못된 접근입니다");
        }

        String resType = checkGoalType(goal.getType());

        goalRepository.delete(goal);

        return BaseResponseDto.builder()
                .success(true)
                .message(resType + " 목표를 삭제하셨습니다")
                .data(goalId)
                .build();
    }


    @Transactional(readOnly = true)
    public List<GoalResponseDto> getGoal(Integer memberId) {

        List<Goal> allByMemberId = goalRepository.findAllByMemberId(memberId);

        return allByMemberId.stream()
                .map(goal->GoalResponseDto.builder()
                        .goalId(goal.getGoalId())
                        .memberId(goal.getMember().getMemberId())
                        .type(goal.getType())
                        .content(goal.getContent())
                        .build())
                .collect(Collectors.toList());
    }

    private String checkGoalType(String type) {

        String resType = "";
        if (type.equals("0")) {
            resType = "매일";
        } else if (type.equals("1")) {
            resType = "매주";
        } else if (type.equals("2")) {
            resType = "매년";
        } else {
            throw new CustomException(HttpStatus.BAD_REQUEST, -1, "type 형태가 잘못되었습니다");
        }
        return resType;
    }

    public List<GalleryResponseDto> getGallery(Integer memberId) {
        List<String> imgOriginalNames = mypageQueryDslRepository.findGalleryImages(memberId);

        return imgOriginalNames.stream().map(GalleryResponseDto::new).collect(Collectors.toList());
    }
}