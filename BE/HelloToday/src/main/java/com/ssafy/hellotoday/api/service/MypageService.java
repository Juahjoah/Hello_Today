package com.ssafy.hellotoday.api.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.response.CalendarDetailResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.response.CheerMessageResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.response.DdayResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import com.ssafy.hellotoday.common.util.constant.MypageEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import com.ssafy.hellotoday.db.entity.mypage.Dday;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.mypage.CheerMessageRepository;
import com.ssafy.hellotoday.db.repository.mypage.DdayRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.hellotoday.db.entity.QMember.member;
import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineCheck.routineCheck;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetail.routineDetail;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetailCat.routineDetailCat;

@Service
@RequiredArgsConstructor
@Transactional
public class MypageService {
    private final CheerMessageRepository cheerMessageRepository;
    private final MemberRepository memberRepository;
    private final DdayRepository ddayRepository;
    private final RoutineRepository routineRepository;
    private final JPAQueryFactory queryFactory;

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
                        .writerId(writer.getMemberId())
                        .memberId(member.getMemberId())
                        .createdDate(cheerMessage.getCreatedDate())
                        .modifiedDate(cheerMessage.getModifiedDate())
                        .content(cheerMessage.getContent())
                        .build())
                .build();
    }

    public BaseResponseDto modifyCheerMessage(CheerMessageModifyRequestDto cheerMessageModifyRequestDto, Member writer) {
        CheerMessage cheerMessage = cheerMessageRepository.findById(cheerMessageModifyRequestDto.getCheerMessageId()).get();
        cheerMessage.update(cheerMessageModifyRequestDto, writer);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_MODIFY_CHEER_MESSAGE.getName())
                .data(CheerMessageResponseDto.builder()
                        .writerId(writer.getMemberId())
                        .memberId(cheerMessage.getMember().getMemberId())
                        .createdDate(cheerMessage.getMember().getCreatedDate())
                        .modifiedDate(cheerMessage.getModifiedDate())
                        .content(cheerMessage.getContent())
                        .build())
                .build();
    }

    public List<CheerMessageResponseDto> getCheerMessages(Integer memberId, PageRequest pageRequest) {

        List<CheerMessage> cheerMessageList = cheerMessageRepository.findByMember_MemberId(memberId, pageRequest);

        List<CheerMessageResponseDto> result = cheerMessageList.stream()
                .map(cheerMessage -> new CheerMessageResponseDto(cheerMessage))
                .collect(Collectors.toList());
        return result;
    }

    public BaseResponseDto deleteCheerMessage(Integer cheerMessageId) {
        cheerMessageRepository.deleteById(cheerMessageId);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_DELETE_CHEER_MESSAGE.getName())
                .build();
    }

    public List<DdayResponseDto> getDdays(Integer memberId) {
        List<Dday> ddayList = ddayRepository.findByMember_MemberId(memberId);

        List<DdayResponseDto> result = ddayList.stream()
                .map(dday -> new DdayResponseDto(dday))
                .collect(Collectors.toList());
        return result;
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

    public BaseResponseDto deleteDday(Integer ddayId) {
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

        List<RoutineResponseDto> result = routineList.stream()
                .map(routine -> new RoutineResponseDto(routine))
                .collect(Collectors.toList());

        return result;
    }

    public List<CalendarDetailResponseDto> getCalendarRoutineDetail(Integer memberId, LocalDate checkDate) {

        List<CalendarDetailResponseDto> calendarDetailList = queryFactory
                .select(Projections.constructor(CalendarDetailResponseDto.class
                        , routineDetail.content
                        , routineCheck.modifiedDate
                        , routineCheck.imgPath
                        , routineCheck.content))
                .from(routineCheck)
                .leftJoin(routineDetailCat).on(routineCheck.routineDetailCat.routineDetailCatId.eq(routineDetailCat.routineDetailCatId))
                .leftJoin(routineDetail).on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .leftJoin(routine).on(routineDetailCat.routine.routineId.eq(routine.routineId))
                .leftJoin(member).on(routine.member.memberId.eq(member.memberId))
                .where(member.memberId.eq(memberId)
                        .and(routineCheck.checkDate.between(checkDate.atStartOfDay(), checkDate.plusDays(1).atStartOfDay()))
                )
                .fetch();

        return calendarDetailList;
    }
}