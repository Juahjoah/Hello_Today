package com.ssafy.hellotoday.db.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.follow.response.SearchTagResponseDto;
import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetail.routineDetail;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetailCat.routineDetailCat;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineTag.routineTag;

@RequiredArgsConstructor
@Repository
public class SearchQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public List<SearchResponseDto> findMemberWithRoutinTagByNicknames(List<Member> results) {
        return queryFactory.selectFrom(routineDetail)
                .join(routineTag)
                .on(routineDetail.routineTag.routineTagId.eq(routineTag.routineTagId))
                .join(routineDetailCat)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .join(routine)
                .on(routine.routineId.eq(routineDetailCat.routine.routineId))
                .where(routine.member.memberId
                        .in(results.stream().map(Member::getMemberId).collect(Collectors.toList())))
                .transform(groupBy(routine.member.memberId)
                        .list(Projections.constructor(SearchResponseDto.class,
                                routine.member.memberId, routine.member.nickname,
                                routine.member.profileOriginalName,
                                list(Projections.constructor(SearchTagResponseDto.class,
                                        routineTag.routineTagId, routineTag.content)))));
    }
}
