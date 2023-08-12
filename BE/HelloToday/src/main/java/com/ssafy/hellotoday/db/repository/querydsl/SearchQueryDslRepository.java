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

    private long countMembersWithRoutineTagByMemberIds(List<Integer> memberIds) {
        return queryFactory.select(member.count())
                .from(member)
                .leftJoin(routine)
                .on(member.memberId.eq(routine.member.memberId))
                .leftJoin(routineDetailCat)
                .on(routine.routineId.eq(routineDetailCat.routine.routineId))
                .leftJoin(routineDetail)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .leftJoin(routineTag)
                .on(routineDetail.routineTag.routineTagId.eq(routineTag.routineTagId))
                .where(member.memberId.in(memberIds))
                .fetchFirst();
    }

    public Page<SearchResponseDto> findMembersWithRoutineTagByMemberIds(List<Integer> memberIds, Pageable pageable) {
        long count = countMembersWithRoutineTagByMemberIds(memberIds);
        System.out.println("=================================");
        System.out.println(count);
        System.out.println(pageable.getOffset() - pageable.getPageSize() + " " + pageable.getPageSize());
        System.out.println("=================================");
        List<SearchResponseDto> results = queryFactory.selectFrom(member)
                .leftJoin(routine)
                .on(member.memberId.eq(routine.member.memberId))
                .leftJoin(routineDetailCat)
                .on(routine.routineId.eq(routineDetailCat.routine.routineId))
                .leftJoin(routineDetail)
                .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                .leftJoin(routineTag)
                .on(routineDetail.routineTag.routineTagId.eq(routineTag.routineTagId))
                .where(member.memberId.in(memberIds))
//                .offset(pageable.getOffset() - pageable.getPageSize())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .transform(groupBy(member.memberId)
                        .list(Projections.constructor(
                                SearchResponseDto.class,
                                member.memberId, member.nickname,
                                member.profileOriginalName,
                                list(Projections.constructor(
                                        SearchTagResponseDto.class,
                                        routineTag.routineTagId,
                                        routineTag.content)))));

        return new PageImpl<>(results, pageable, count);
    }

    public List<Member> findMembersByTag(int tagId) {
        return queryFactory.select(member)
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
                .fetch();
    }
}
