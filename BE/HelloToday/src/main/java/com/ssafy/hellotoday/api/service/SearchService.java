package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.common.exception.validator.SearchValidator;
import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.querydsl.SearchQueryDslRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final MemberRepository memberRepository;
    private final SearchQueryDslRepository searchQueryDslRepository;
    private final SearchValidator searchValidator;

    public List<SearchResponseDto> search(String key, String word) {
        List<Member> results;
        searchValidator.validKey(key);
        searchValidator.validateWord(word);
        List<SearchResponseDto> res = new ArrayList<>();
        if (key.equals(SearchKeyEnum.NICKNAME.getName())) {
            results = memberRepository.findByNicknameContaining(word);
            res = searchQueryDslRepository.findMemberWithRoutinTagByNicknames(results);
            transferProfilePath(res);

        } else {
            results = findByTag(word);
        }

        // 조회 결과가 없을 때 처리 필요

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

    private List<Member> findByTag(String word) {
        return null;
    }
}
