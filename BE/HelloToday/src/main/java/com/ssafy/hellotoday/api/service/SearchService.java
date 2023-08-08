package com.ssafy.hellotoday.api.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.api.dto.follow.response.SearchTagResponseDto;
import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.common.exception.validator.SearchValidator;
import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import com.ssafy.hellotoday.common.util.property.ApplicationProperties;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.routine.RoutineTag;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<SearchResponseDto> res = new ArrayList<>();
        if (key.equals(SearchKeyEnum.NICKNAME.getName())) {
            results = memberRepository.findByNicknameContaining(word);
            res = selectByNickname(queryFactory, results);
            res = transferProfilePath(res);

        } else {
            results = findByTag(word);
        }

        // 조회 결과가 없을 때 처리 필요

        return res;
    }

    private List<SearchResponseDto> transferProfilePath(List<SearchResponseDto> res) {
        for (SearchResponseDto searchResponseDto : res) {
            Member member = memberRepository
                    .findById(searchResponseDto.getMemberId())
                    .orElseThrow(() -> new IllegalArgumentException("멤버 조회 에러"));
            searchResponseDto.setProfile(member.getProfileImagePath());
        }
        return res;
    }

    private List<SearchResponseDto> selectByNickname(JPAQueryFactory queryFactory, List<Member> results) {
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

    private List<Member> findByTag(String word) {
        return null;
    }

    private String getProfileImagePath(String profilePath, String profileOriginalName) {
        if(profilePath == null) return null;
        else if(profilePath.contains("http://k.kakaocdn.net/")||profilePath.contains("pstatic.net/")) return profilePath;
        return ApplicationProperties.HOST_IMAGE_URL + "profile/" + profileOriginalName;
    }

}
