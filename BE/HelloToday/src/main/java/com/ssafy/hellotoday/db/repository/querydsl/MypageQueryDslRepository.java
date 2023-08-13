package com.ssafy.hellotoday.db.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.mypage.response.CalendarHistoryDetailResponseDto;
import com.ssafy.hellotoday.db.entity.routine.QRoutineCheck;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.entity.routine.RoutineCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.hellotoday.db.entity.QMember.member;
import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineCheck.routineCheck;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetail.routineDetail;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetailCat.routineDetailCat;

@RequiredArgsConstructor
@Repository
public class MypageQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public List<CalendarHistoryDetailResponseDto> findCalendarDetailList(int memberId, LocalDate checkDate) {
        return queryFactory
                .select(Projections.constructor(CalendarHistoryDetailResponseDto.class
                        , routineDetail.content
                        , routineCheck.modifiedDate
                        , routineCheck.imgOriginalName
                        , routineCheck.content))
                .from(routineCheck)
                .leftJoin(routineDetailCat)
                .on(routineCheck.routineDetailCat.routineDetailCatId.eq(routineDetailCat.routineDetailCatId))
                .leftJoin(routineDetail)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .leftJoin(routine)
                .on(routineDetailCat.routine.routineId.eq(routine.routineId))
                .leftJoin(member)
                .on(routine.member.memberId.eq(member.memberId))
                .where(member.memberId.eq(memberId)
                        .and(routineCheck.checkDate.between(checkDate.atStartOfDay(),
                                checkDate.plusDays(1).atStartOfDay()))
                )
                .fetch();
    }

    public RoutineCheck findRoutineCheckImage(Routine routineItem) {
        return queryFactory.selectFrom(QRoutineCheck.routineCheck)
                .leftJoin(routineDetailCat)
                .on(QRoutineCheck.routineCheck.routineDetailCat.routineDetailCatId
                        .eq(routineDetailCat.routineDetailCatId))
                .leftJoin(routineDetail)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .leftJoin(routine)
                .on(routineDetailCat.routine.routineId.eq(routine.routineId))
                .where(routine.routineId.eq(routineItem.getRoutineId()))
                .orderBy(QRoutineCheck.routineCheck.imgPath.desc()).fetch().get(0);
    }

    public List<CalendarHistoryDetailResponseDto> findRoutineDetailList(int routineId, int i) {
        return queryFactory.select(Projections.constructor(CalendarHistoryDetailResponseDto.class
                        , routineDetail.content
                        , routineCheck.modifiedDate
                        , routineCheck.imgOriginalName
                        , routineCheck.content))
                .from(routineCheck)
                .leftJoin(routineDetailCat).on(routineCheck.routineDetailCat.routineDetailCatId.eq(routineDetailCat.routineDetailCatId))
                .leftJoin(routineDetail).on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .leftJoin(routine).on(routineDetailCat.routine.routineId.eq(routine.routineId))
                .leftJoin(member).on(routine.member.memberId.eq(member.memberId))
                .where(routine.routineId.eq(routineId)
                        .and(routineCheck.checkDaySeq.eq(i))
                        .and(routineCheck.checkDate.isNotNull()))
                .fetch();
    }

    public List<String> findGalleryImages(int memberId) {
        return queryFactory.select(routineCheck.imgOriginalName)
                .from(routineCheck)
                .leftJoin(routineDetailCat)
                .on(routineCheck.routineDetailCat.routineDetailCatId.eq(routineDetailCat.routineDetailCatId))
                .leftJoin(routine).on(routineDetailCat.routine.routineId.eq(routine.routineId))
                .leftJoin(member).on(routine.member.memberId.eq(member.memberId))
                .where(member.memberId.eq(memberId).and(routineCheck.imgOriginalName.isNotNull()))
                .orderBy(routineCheck.checkDate.desc()).fetch();
    }
}
