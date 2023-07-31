package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageRequestDto;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.mypage.CheerMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MypageService {
    private final CheerMessageRepository cheerMessageRepository;
    private final MemberRepository memberRepository;

    public void writeCheerMessage(CheerMessageRequestDto cheerMessageRequestDto) {
        Member member = getMember(cheerMessageRequestDto.getMemberId());
        Member writer = getMember(cheerMessageRequestDto.getWriterId());

        CheerMessage cheerMessage = CheerMessage.builder()
                .member(member)
                .writer(writer)
                .content(cheerMessageRequestDto.getContent())
                .build();

        cheerMessageRepository.save(cheerMessage);
    }

    private Member getMember(Integer memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member.get();
    }

    public void modifyCheerMessage(CheerMessageModifyRequestDto cheerMessageModifyRequestDto) {
        Member writer = getMember(cheerMessageModifyRequestDto.getWriterId());

        CheerMessage cheerMessage = cheerMessageRepository.findById(cheerMessageModifyRequestDto.getCheerMessageId()).get();
        cheerMessage.update(cheerMessageModifyRequestDto, writer);
    }

    public void deleteCheerMessage(Integer cheerMessageId) {
        cheerMessageRepository.deleteById(cheerMessageId);
    }
}
