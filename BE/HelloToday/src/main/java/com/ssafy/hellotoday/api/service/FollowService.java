package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.follow.request.FollowSaveRequestDto;
import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.follow.response.FollowResponseDto;
import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    private final FollowValidator followValidator;
    private final MemberValidator memberValidator;

    /**
     * 요청자를 팔로우하고 있는 사용자 정보 목록을 반환하는 메서드
     * @param member 팔로워 목록 조회를 요청하는 사용자
     * @return 요청자를 팔로우하고 있는 사용자 정보 목록
     */
    public List<MemberResponseDto> getFollowers(Member member) {

        List<Follow> followers = followRepository.findAllByFollowing(member.getMemberId());
        return followers.stream()
                .map(follow -> MemberResponseDto.builder()
                        .memberId(follow.getFollower().getMemberId())
                        .email(follow.getFollower().getEmail())
                        .nickname(follow.getFollower().getNickname())
                        .stMsg(follow.getFollower().getStMsg())
                        .profilePath(follow.getFollower().getProfilePath())
                        .build())
                .collect(Collectors.toList());
    }

    /**
     * 요청자가 팔로우하고 있는 사용자 정보 목록을 반환하는 메서드
     * @param member 팔로잉 목록 조회를 요청하는 사용자
     * @return 요청자가 팔로우하고 있는 사용자 정보 목록
     */
    public List<MemberResponseDto> getFollowings(Member member) {

        List<Follow> followings = followRepository.findAllByFollower(member.getMemberId());
        return followings.stream()
                .map(follow -> MemberResponseDto.builder()
                        .memberId(follow.getFollowing().getMemberId())
                        .email(follow.getFollowing().getEmail())
                        .nickname(follow.getFollowing().getNickname())
                        .stMsg(follow.getFollowing().getStMsg())
                        .profilePath(follow.getFollowing().getProfilePath())
                        .build())
                .collect(Collectors.toList());
    }

    /**
     * 팔로우를 등록하는 메서드
     * @param follower 팔로우 신청자
     * @param followSaveRequestDto 팔로우 할 대상의 memberId를 담는 Dto
     * @return 팔로우 정상 등록 시 followId, followerId, followingId를 리턴, 에러 시 에러코드와 메세지 리턴
     */
    @Transactional
    public BaseResponseDto enrollFollow(Member follower, FollowSaveRequestDto followSaveRequestDto) {
        int followerId = follower.getMemberId();
        memberValidator.checkDifferentMembers(followerId, followSaveRequestDto.getFollowingId());

        Member followee = getMember(followSaveRequestDto.getFollowingId());

        followValidator.checkFollowNotExist(followRepository, follower, followee);

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

    /**
     * 팔로우를 취소하는 메서드
     * @param follower 팔로우 취소를 요청하는 사용자
     * @param followeeId 팔로우 취소 대상의 memberId
     * @return 팔로우 정상 취소 시 취소된 followId, followerId, followingId를 리턴, 에러 시 에러코드와 메세지 리턴
     */
    @Transactional
    public BaseResponseDto deleteFollow(Member follower, int followeeId) {
        int followerId = follower.getMemberId();
        memberValidator.checkDifferentMembers(followerId, followeeId);

        Member followee = getMember(followeeId);

        Follow follow = followValidator.checkFollowExist(followRepository, follower, followee);
        followRepository.delete(follow);

        return BaseResponseDto.builder()
                .success(true)
                .message(FollowResponseEnum.SUCCESS_DELETE_FOLLOW.getName())
                .data(FollowResponseDto.builder()
                        .followId(follow.getFollowId())
                        .followerId(followerId)
                        .followingId(followeeId)
                        .build())
                .build();
    }

    /**
     * 두 사용자가 팔로우 상태인지 확인하는 메소드
     * @param follower 로그인 된 사용자
     * @param followeeId 팔로우 상태를 확인하고자 하는 사용자
     * @return 팔로우 상태를 true, false로 리턴
     */
    public BaseResponseDto checkFollowStatus(Member follower, int followeeId) {
        int followerId = follower.getMemberId();
        memberValidator.checkDifferentMembers(followerId, followeeId);

        Member followee = getMember(followeeId);
        Optional<Follow> follow = followRepository.findByFollowing_MemberId(followee.getMemberId());

        if (follow.isPresent()) {
            return getFollowStatusResponse(FollowResponseEnum.FOLLOW_STATUS_TRUE.getName(), true);
        } else {
            return getFollowStatusResponse(FollowResponseEnum.FOLLOW_STATUS_FALSE.getName(), false);
        }
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
        memberValidator.checkMember(member, memberId);
        return member.get();
    }

    private BaseResponseDto getFollowStatusResponse(String message, boolean success) {
        return BaseResponseDto.builder()
                .success(true)
                .message(message)
                .data(success)
                .build();
    }
}
