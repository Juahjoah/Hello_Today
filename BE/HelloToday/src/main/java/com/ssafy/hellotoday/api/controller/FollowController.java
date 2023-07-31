package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.follow.request.FollowSaveRequestDto;
import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import com.ssafy.hellotoday.api.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Follow", description = "팔로우 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/follow")
public class FollowController {
    private final FollowService followService;

    @Operation(summary = "사용자의 팔로워 목록 조회", description = "요청한 회원을 팔로우하고 있는 사용자들을 조회하는 API")
    @GetMapping("/follower")
    public List<MemberResponseDto> getFollowers(/*HttpServletRequest httpServletRequest*/) {
        // 로그인 한 사용자 정보 조회 -> 로그인 사용자 정보가 잘못됐을 시 에러 발생코드 추가돼야 함
//        String token = httpServletRequest.getHeader("Authorization");
//        Member member = memberService.findUserByJwtToken(token);

        return followService.getFollowers(2);
    }

    @Operation(summary = "사용자의 팔로잉 목록 조회", description = "요청한 회원이 팔로우하고 있는 사용자들을 조회하는 API")
    @GetMapping("/following")
    public List<MemberResponseDto> getFollowings(/*HttpServletRequest httpServletRequest*/) {
        // 로그인 한 사용자 정보 조회 -> 로그인 사용자 정보가 잘못됐을 시 에러 발생코드 추가돼야 함
//        String token = httpServletRequest.getHeader("Authorization");
//        Member member = memberService.findUserByJwtToken(token);

        return followService.getFollowings(3);
    }

    @Operation(summary = "팔로우 등록", description = "로그인 한 회원이 팔로우를 신청하는 API")
    @PostMapping
    public BaseResponseDto enrollFollow(/*HttpServletRequest httpServletRequest,*/
                                        @RequestBody FollowSaveRequestDto followSaveRequestDto) {

        // 로그인 한 사용자 정보 조회 -> 로그인 사용자 정보가 잘못됐을 시 에러 발생코드 추가돼야 함
//        String token = httpServletRequest.getHeader("Authorization");
//        Member member = memberService.findUserByJwtToken(token);

        return followService.enrollFollow(3, followSaveRequestDto);
    }

    @Operation(summary = "팔로우 취소", description = "팔로우를 취소하는 API")
    @DeleteMapping
    public BaseResponseDto deleteFollow(/*HttpServletRequest httpServletRequest,*/
                                        @RequestParam(name = "target") int targetId) {
        // 로그인 한 사용자 정보 조회 -> 로그인 사용자 정보가 잘못됐을 시 에러 발생코드 추가돼야 함
//        String token = httpServletRequest.getHeader("Authorization");
//        Member member = memberService.findUserByJwtToken(token);

        return followService.deleteFollow(3, targetId);
    }

}
