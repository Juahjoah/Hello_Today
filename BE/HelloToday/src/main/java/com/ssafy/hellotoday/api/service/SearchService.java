package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.api.dto.search.response.SearchResponsePageDto;
import com.ssafy.hellotoday.common.exception.validator.SearchValidator;
import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.querydsl.SearchQueryDslRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class SearchService {
    private final MemberRepository memberRepository;
    private final SearchQueryDslRepository searchQueryDslRepository;
    private final SearchValidator searchValidator;

    public SearchResponsePageDto search(String key, String word, int page, int size) {
        Page<Member> memberPage;
        searchValidator.validKey(key);

        List<SearchResponseDto> searchedMembers;
        Pageable pageable = PageRequest.of(page, size);
        if (key.equals(SearchKeyEnum.NICKNAME.getName())) {
            searchValidator.validateWordString(word);
            memberPage = memberRepository.findByNicknameStartingWithOrderByNickname(word, pageable);
        } else {
            searchValidator.validateWordNum(word);
            memberPage = searchQueryDslRepository.findMembersByTag(Integer.parseInt(word), pageable);
        }

        searchedMembers = searchQueryDslRepository.findMembersWithRoutineTagByMemberIds(
                memberPage.getContent().stream().map(Member::getMemberId).collect(Collectors.toList()));
        transferProfilePath(searchedMembers);
        log.info("검색 결과 수: " + searchedMembers.size());
        for (SearchResponseDto member: searchedMembers) {
            log.info(member.toString());
        }
        return SearchResponsePageDto.builder()
                .totalPages(memberPage.getTotalPages())
                .totalMembers(memberPage.getTotalElements())
                .members(searchedMembers)
                .build();
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
