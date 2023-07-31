package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.member.response.MemberMypageResponse;
import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/members")
public class MypageController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;



    //마이페이지 사용자 상세 정보 조회

    @GetMapping
    public MemberResponseDto DefaultMemberInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.getMemberInfo(findMember);

    }


//    @GetMapping("/mypage")
//    public MemberMypageResponse DefaultMemberInfo(HttpServletRequest httpServletRequest) {
//
//        String token = httpServletRequest.getHeader("Authorization");
//        if (token==null) return null;
//
//        Member findMember = memberService.findMemberByJwtToken(token);
//
//        return memberService.getMemberInfo(findMember);
//
//    }




}
