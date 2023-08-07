package com.ssafy.hellotoday.api.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.common.exception.validator.SearchValidator;
import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.routine.RoutineTag;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetail.routineDetail;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineDetailCat.routineDetailCat;
import static com.ssafy.hellotoday.db.entity.routine.QRoutineTag.routineTag;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final MemberRepository memberRepository;
    private final SearchValidator searchValidator;
    private final JPAQueryFactory queryFactory;

    public List<SearchResponseDto> search(String key, String word) {
        List<Member> results;
        searchValidator.validKey(key);
        searchValidator.validateWord(word);

        if (key.equals(SearchKeyEnum.NICKNAME.getName())) {
            results = memberRepository.findByNicknameContaining(word);
            Map<Integer, List<RoutineTag>> res = queryFactory.selectFrom(routineDetail)
                    .join(routineTag)
                    .on(routineDetail.routineTag.routineTagId.eq(routineTag.routineTagId))
                    .join(routineDetailCat)
                    .on(routineDetailCat.routineDetail.routineDetailId.eq(routineDetail.routineDetailId))
                    .join(routine)
                    .on(routine.routineId.eq(routineDetailCat.routine.routineId))
                    .where(routine.member.memberId
                            .in(results.stream().map(Member::getMemberId).collect(Collectors.toList())))
                    .transform(groupBy(routine.member.memberId).as(list(routineTag)));

        } else {
            results = findByTag(word);
        }

        // 조회 결과가 없을 때 처리 필요

        return results.stream().map(member -> SearchResponseDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .profile(member.getProfileImagePath())
                .tagList(null)
                .build()).collect(Collectors.toList());
    }

    private List<Member> findByTag(String word) {
        return null;
    }

}
