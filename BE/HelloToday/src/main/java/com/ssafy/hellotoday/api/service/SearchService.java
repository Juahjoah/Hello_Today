package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.common.exception.validator.SearchValidator;
import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.querydsl.SearchQueryDslRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final MemberRepository memberRepository;
    private final SearchQueryDslRepository searchQueryDslRepository;
    private final SearchValidator searchValidator;

    public List<SearchResponseDto> search(String key, String word) {
        List<Member> members;
        searchValidator.validKey(key);
        List<SearchResponseDto> res;
        if (key.equals(SearchKeyEnum.NICKNAME.getName())) {
            searchValidator.validateWordString(word);
            members = memberRepository.findByNicknameStartingWith(word);
        } else {
            searchValidator.validateWordNum(word);
            members = searchQueryDslRepository.findMembersByTag(Integer.parseInt(word));
        }
        res = searchQueryDslRepository.findMembersWithRoutineTagByMemberIds(members.stream()
                .map(Member::getMemberId).collect(Collectors.toList()));
        transferProfilePath(res);

        return res;
    }

    private void transferProfilePath(List<SearchResponseDto> res) {
        for (SearchResponseDto searchResponseDto : res) {
            Member member = memberRepository
                    .findById(searchResponseDto.getMemberId())
                    .orElseThrow(() -> new IllegalArgumentException("멤버 조회 에러"));
            searchResponseDto.setProfile(member.getProfileImagePath());
        }
    }
}
