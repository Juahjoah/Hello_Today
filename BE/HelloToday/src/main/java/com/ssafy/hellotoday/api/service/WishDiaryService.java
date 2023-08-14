package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.wishdiary.request.WishDiaryRequestDto;
import com.ssafy.hellotoday.api.dto.wishdiary.response.WishDiaryResponseDto;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.widget.wishdiary.WishDiary;
import com.ssafy.hellotoday.db.entity.widget.wishdiary.Type;
import com.ssafy.hellotoday.db.repository.widget.WishDiaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class WishDiaryService {

    private final WishDiaryRepository wishDiaryRepository;

    @Transactional(readOnly = true)
    public List<WishDiaryResponseDto> getWishDiary(Integer memberId, Type type) {

        List<WishDiary> findAllBucketList = wishDiaryRepository.findAllByMemberIdAndType(memberId, type);


        return findAllBucketList.stream()
                .map(wishDiary -> WishDiaryResponseDto.builder()
                        .wishDiaryId(wishDiary.getWishDiaryId())
                        .memberId(wishDiary.getMember().getMemberId())
                        .content(wishDiary.getContent())
                        .type(wishDiary.getType())
                        .build())
                .collect(Collectors.toList());
    }


    @Transactional
    public BaseResponseDto writeBucketDiary(Member findMember, WishDiaryRequestDto wishDiaryUpdateRequestDto, Type type) {

        WishDiary newBucketDiary = WishDiary.builder()
                    .member(findMember)
                    .type(type)
                    .content(wishDiaryUpdateRequestDto.getContent())
                    .build();

        wishDiaryRepository.save(newBucketDiary);
        WishDiaryResponseDto save = WishDiaryResponseDto.builder()
                .wishDiaryId(newBucketDiary.getWishDiaryId())
                .memberId(newBucketDiary.getMember().getMemberId())
                .content(newBucketDiary.getContent())
                .type(newBucketDiary.getType())
                .build();
        if (type.equals(Type.BUCKETLIST)) {
            return BaseResponseDto.builder()
                    .success(true)
                    .message("버킷리스트를 작성하셨습니다")
                    .data(save)
                    .build();
        }
        return BaseResponseDto.builder()
                .success(true)
                .message("한줄 일기를 작성하셨습니다")
                .data(save)
                .build();
    }

    @Transactional
    public BaseResponseDto updateBucketDiary(Integer wishDiaryId, Member findMember, WishDiaryRequestDto wishDiaryUpdateRequestDto, Type type) {

        WishDiary wishDiary = wishDiaryRepository.findById(wishDiaryId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 유저의 bucketWish 정보가없습니다"));

        if (!findMember.equals(wishDiary.getMember())) {
            throw new IllegalArgumentException("잘못된 접근입니다.");
        }
        if (!wishDiary.getType().equals(type)) {
            throw new IllegalArgumentException("해당 타입(BUCKETLIST,DIARY)을 잘못 접근하였습니다");
        }


        wishDiary.updateWishDiary(wishDiaryUpdateRequestDto);
        WishDiaryResponseDto update = WishDiaryResponseDto.builder()
                .wishDiaryId(wishDiary.getWishDiaryId())
                .memberId(wishDiary.getWishDiaryId())
                .content(wishDiary.getContent())
                .type(wishDiary.getType())
                .build();

        if (wishDiary.getType().equals(Type.BUCKETLIST)) {

            return BaseResponseDto.builder()
                    .success(true)
                    .message("버킷리스트 내용 수정을 완료하였습니다")
                    .data(update)
                    .build();
        }

        return BaseResponseDto.builder()
                .success(true)
                .message("한줄일기 내용 수정을 완료하였습니다")
                .data(update)
                .build();
    }

    //wishdiary 삭제
    @Transactional
    public BaseResponseDto deleteWishDiary(Integer id, Member findMember,Type type) {

        WishDiary wishDiary = wishDiaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id " + id + "에 해당하는 wishdairy가 존재하지 않습니다."));

        if (!findMember.equals(wishDiary.getMember())) {
            throw new IllegalArgumentException("잘못된 접근입니다.");
        }

        if (!wishDiary.getType().equals(type)) {
            throw new IllegalArgumentException("잘못된 type 접근입니다.");
        }

        if (wishDiary.getType().equals(Type.BUCKETLIST)) {

            wishDiaryRepository.delete(wishDiary);
            return BaseResponseDto.builder()
                    .success(true)
                    .message("버킷리스트가 삭제되었습니다")
                    .data(id)
                    .build();
        }


        wishDiaryRepository.delete(wishDiary);
        return BaseResponseDto.builder()
                .success(true)
                .message("한줄 일기가 삭제되었습니다")
                .data(id)
                .build();
    }


}