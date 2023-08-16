package com.ssafy.hellotoday.db.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.follow.response.SearchTagResponseDto;
import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.hellotoday.db.entity.QMember.member;
import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetail.routineDetail;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetailCat.routineDetailCat;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineTag.routineTag;

@RequiredArgsConstructor
@Repository
public class SearchQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public List<SearchResponseDto> findMembersWithRoutineTagByMemberIds(List<Integer> memberIds) {
        return queryFactory.selectFrom(member)
                .leftJoin(routine)
                .on(member.memberId
                        .eq(routine.member.memberId)
                        .and(routine.activeFlag.eq((byte) 1)))
                .leftJoin(routineDetailCat)
                .on(routine.routineId.eq(routineDetailCat.routine.routineId))
                .leftJoin(routineDetail)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .leftJoin(routineTag)
                .on(routineDetail.routineTag.routineTagId.eq(routineTag.routineTagId))
                .where(member.memberId.in(memberIds))
                .orderBy(member.nickname.asc())
                .transform(groupBy(member.memberId)
                        .list(Projections.constructor(
                                SearchResponseDto.class,
                                member.memberId, member.nickname,
                                member.profileOriginalName,
                                list(Projections.constructor(
                                        SearchTagResponseDto.class,
                                        routineTag.routineTagId,
                                        routineTag.content)))));
    }

    public Page<Member> findMembersByTag(int tagId, Pageable pageable) {
        long count = countMembersByTag(tagId);

        List<Member> members = queryFactory.selectDistinct(member)
                .from(routineDetail)
                .join(routineTag)
                .on(routineTag.routineTagId.eq(routineDetail.routineTag.routineTagId))
                .join(routineDetailCat)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .join(routine)
                .on(routine.routineId.eq(routineDetailCat.routine.routineId))
                .join(member)
                .on(member.memberId.eq(routine.member.memberId))
                .where(routineTag.routineTagId.eq(tagId))
                .orderBy(member.nickname.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(members, pageable, count);
    }

    private long countMembersByTag(int tagId) {
        return queryFactory.selectDistinct(member.count())
                .from(routineDetail)
                .join(routineTag)
                .on(routineTag.routineTagId.eq(routineDetail.routineTag.routineTagId))
                .join(routineDetailCat)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .join(routine)
                .on(routine.routineId.eq(routineDetailCat.routine.routineId))
                .join(member)
                .on(member.memberId.eq(routine.member.memberId))
                .where(routineTag.routineTagId.eq(tagId))
                .fetchFirst();
    }
}
