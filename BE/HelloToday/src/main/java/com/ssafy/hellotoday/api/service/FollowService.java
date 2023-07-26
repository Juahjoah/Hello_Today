package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.request.follow.FollowSaveRequestDto;
import com.ssafy.hellotoday.api.response.BaseResponseDto;
import com.ssafy.hellotoday.api.response.follow.FollowResponseDto;
import com.ssafy.hellotoday.common.exception.validator.FollowValidator;
import com.ssafy.hellotoday.common.exception.validator.MemberValidator;
import com.ssafy.hellotoday.common.util.constant.FollowResponseEnum;
import com.ssafy.hellotoday.db.entity.Follow;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.FollowRepository;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    private final FollowValidator followValidator;
    private final MemberValidator memberValidator;

    @Transactional
    public BaseResponseDto enrollFollow(int followerId, FollowSaveRequestDto followSaveRequestDto) {
        memberValidator.checkMembers(followerId, followSaveRequestDto.getFollowingId());

        Member follower = getMember(followerId);
        Member followee = getMember(followSaveRequestDto.getFollowingId());

        followValidator.checkFollowStatus(followRepository, follower, followee);

        int followId = saveFollow(follower, followee);

        return BaseResponseDto.builder()
                .success(true)
                .message(FollowResponseEnum.SUCCESS_ENROLL_FOLLOW.getName())
                .data(FollowResponseDto.builder()
                        .followId(followId)
                        .followerId(followerId)
                        .followingId(followSaveRequestDto.getFollowingId())
                        .build())
                .build();
    }

    @Transactional
    public int saveFollow(Member follower, Member followee) {
        Follow follow = Follow.builder()
                .follower(follower)
                .following(followee)
                .build();

        followRepository.save(follow);

        return follow.getFollowId();
    }

    private Member getMember(int memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        memberValidator.checkMember(member);
        return member.get();
    }
}
