package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.member.response.MypageModifyResponse;
import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "Mypage", description = "마이페이지 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/mypage")
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


    @GetMapping("/widget")
    public MypageModifyResponse MypageWidgetInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.getWidgetInfo(findMember);

    }




}
