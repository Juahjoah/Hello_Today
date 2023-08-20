package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.api.dto.search.response.SearchResponsePageDto;
import com.ssafy.hellotoday.common.exception.validator.MemberValidator;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class SearchService {
    private final MemberRepository memberRepository;
    private final SearchQueryDslRepository searchQueryDslRepository;

    private final SearchValidator searchValidator;
    private final MemberValidator memberValidator;

    public SearchResponsePageDto search(String key, String word, int page, int size) {
        searchValidator.validKey(key);

        Page<Member> memberPage = getMemberPageByKeyAndWord(key, word, page, size);

        List<SearchResponseDto> searchedMembers =
                searchQueryDslRepository.findMembersWithRoutineTagByMemberIds(
                        memberPage
                                .getContent()
                                .stream()
                                .map(Member::getMemberId)
                                .collect(Collectors.toList())
                );

        transferProfilePath(searchedMembers);

        return SearchResponsePageDto.builder()
                .totalPages(memberPage.getTotalPages())
                .totalMembers(memberPage.getTotalElements())
                .members(searchedMembers)
                .build();
    }

    private Page<Member> getMemberPageByKeyAndWord(String key, String word, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (key.equals(SearchKeyEnum.NICKNAME.getName())) {
            searchValidator.validateWordString(word);
            return memberRepository.findByNicknameStartingWithOrderByNickname(word, pageable);
        }

        searchValidator.validateWordNum(word);
        return searchQueryDslRepository.findMembersByTag(Integer.parseInt(word), pageable);
    }

    private void transferProfilePath(List<SearchResponseDto> res) {
        for (SearchResponseDto searchResponseDto : res) {
            Optional<Member> member = memberRepository.findById(searchResponseDto.getMemberId());
            memberValidator.checkMember(member, searchResponseDto.getMemberId());

            member.ifPresent(m -> searchResponseDto.setProfile(m.getProfileImagePath()));
        }
    }
}
