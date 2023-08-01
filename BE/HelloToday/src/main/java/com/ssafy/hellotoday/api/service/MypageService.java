package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.response.CheerMessageResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.response.DdayResponseDto;
import com.ssafy.hellotoday.common.util.constant.MypageEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.mypage.CheerMessage;
import com.ssafy.hellotoday.db.entity.mypage.Dday;
import com.ssafy.hellotoday.db.entity.mypage.DdayType;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.mypage.CheerMessageRepository;
import com.ssafy.hellotoday.db.repository.mypage.DdayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MypageService {
    private final CheerMessageRepository cheerMessageRepository;
    private final MemberRepository memberRepository;
    private final DdayRepository ddayRepository;

    public BaseResponseDto writeCheerMessage(CheerMessageRequestDto cheerMessageRequestDto, Member writer) {
        Member member = getMember(cheerMessageRequestDto.getMemberId());

        CheerMessage cheerMessage = CheerMessage.builder()
                .member(member)
                .writer(writer)
                .content(cheerMessageRequestDto.getContent())
                .build();

        cheerMessageRepository.save(cheerMessage);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_WRITE_CHEER_MESSAGE.getName())
                .data(CheerMessageResponseDto.builder()
                        .writerId(writer.getMemberId())
                        .memberId(member.getMemberId())
                        .createdDate(cheerMessage.getCreatedDate())
                        .modifiedDate(cheerMessage.getModifiedDate())
                        .content(cheerMessage.getContent())
                        .build())
                .build();
    }

    public BaseResponseDto modifyCheerMessage(CheerMessageModifyRequestDto cheerMessageModifyRequestDto, Member writer) {
        CheerMessage cheerMessage = cheerMessageRepository.findById(cheerMessageModifyRequestDto.getCheerMessageId()).get();
        cheerMessage.update(cheerMessageModifyRequestDto, writer);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_MODIFY_CHEER_MESSAGE.getName())
                .data(CheerMessageResponseDto.builder()
                        .writerId(writer.getMemberId())
                        .memberId(cheerMessage.getMember().getMemberId())
                        .createdDate(cheerMessage.getMember().getCreatedDate())
                        .modifiedDate(cheerMessage.getModifiedDate())
                        .content(cheerMessage.getContent())
                        .build())
                .build();
    }

    public List<CheerMessageResponseDto> getCheerMessages(Integer memberId, PageRequest pageRequest) {

        List<CheerMessage> cheerMessageList = cheerMessageRepository.findByMember_MemberId(memberId, pageRequest);

        List<CheerMessageResponseDto> result = cheerMessageList.stream()
                .map(cheerMessage -> new CheerMessageResponseDto(cheerMessage))
                .collect(Collectors.toList());
        return result;
    }

    public BaseResponseDto deleteCheerMessage(Integer cheerMessageId) {
        cheerMessageRepository.deleteById(cheerMessageId);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_DELETE_CHEER_MESSAGE.getName())
                .build();
    }

    public List<DdayResponseDto> getDdays(Integer memberId) {
        List<Dday> ddayList = ddayRepository.findByMember_MemberId(memberId);

        List<DdayResponseDto> result = ddayList.stream()
                .map(dday -> new DdayResponseDto(dday))
                .collect(Collectors.toList());
        return result;
    }

    public BaseResponseDto writeDday(DdayRequestDto ddayRequestDto, Member member) {

        Dday dday = Dday.builder()
                .member(member)
                .finalDate(ddayRequestDto.getFinalDate())
                .content(ddayRequestDto.getContent())
                .type(DdayType.valueOf(ddayRequestDto.getType()))
                .build();

        ddayRepository.save(dday);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_WRITE_DDAY_MESSAGE.getName())
                .data(DdayResponseDto.builder()
                        .memberId(dday.getMember().getMemberId())
                        .finalDate(dday.getFinalDate())
                        .content(dday.getContent())
                        .createdDate(dday.getCreatedDate())
                        .modifiedDate(dday.getModifiedDate())
                        .type(String.valueOf(dday.getType()))
                        .build())
                .build();
    }

    public BaseResponseDto modifyDday(DdayModifyRequestDto ddayModifyRequestDto, Member member) {

        Dday dday = ddayRepository.findById(ddayModifyRequestDto.getDdayId()).get();

        dday.update(ddayModifyRequestDto, member);

        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_MODIFY_DDAY_MESSAGE.getName())
                .data(DdayResponseDto.builder()
                        .memberId(dday.getMember().getMemberId())
                        .finalDate(dday.getFinalDate())
                        .content(dday.getContent())
                        .createdDate(dday.getCreatedDate())
                        .modifiedDate(dday.getModifiedDate())
                        .type(String.valueOf(dday.getType()))
                        .build())
                .build();
    }

    public BaseResponseDto deleteDday(Integer ddayId) {
        ddayRepository.deleteById(ddayId);
        return BaseResponseDto.builder()
                .success(true)
                .message(MypageEnum.SUCCESS_DELETE_DDAY_MESSAGE.getName())
                .build();
    }

    private Member getMember(Integer memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member.get();
    }

    public BaseResponseDto getRoutineHistory(Integer memberId) {
        return BaseResponseDto.builder()
                .success(true)
                .data(null).build();
    }
}
