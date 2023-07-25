package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.response.search.SearchResponseDto;
import com.ssafy.hellotoday.common.exception.SearchValidator;
import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final MemberRepository memberRepository;
    private final SearchValidator searchValidator;

    public List<SearchResponseDto> search(String key, String word) {
        List<Member> results = null;
        searchValidator.validKey(key);

        if (key.equals(SearchKeyEnum.NICKNAME.getName())) {
            results = memberRepository.findByNicknameContaining(word);
        }
        else {
            results = findByTag(word);
        }

        // 조회 결과가 없을 때 처리 필요

        return results.stream().map(member -> SearchResponseDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .build()).collect(Collectors.toList());
    }

    private List<Member> findByTag(String word) {
        return null;
    }

}
