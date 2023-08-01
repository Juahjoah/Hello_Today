package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayRequestDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.api.service.MypageService;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MypageController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;
    private final MypageService mypageService;

    //마이페이지 사용자 상세 정보 조회
    @GetMapping
    public MemberResponseDto DefaultMemberInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

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

    @Operation(summary = "응원 메시지 작성", description = "마이페이지 안에 있는 응원 메시지 작성 API")
    @PostMapping("/cheermsg")
    public BaseResponseDto writeCheerMessage(HttpServletRequest httpServletRequest, @RequestBody CheerMessageRequestDto cheerMsgRequestDto) {

        String token = httpServletRequest.getHeader("Authorization");
        Member member = memberService.findMemberByJwtToken(token);

        return mypageService.writeCheerMessage(cheerMsgRequestDto, member);
    }

    @Operation(summary = "응원 메시지 수정", description = "마이페이지 안에 있는 응원 메시지 수정 API")
    @PutMapping("/cheermsg")
    public BaseResponseDto modifyCheerMessage(HttpServletRequest httpServletRequest, @RequestBody CheerMessageModifyRequestDto cheerMessageRequestDto) {

        String token = httpServletRequest.getHeader("Authorization");
        Member member = memberService.findMemberByJwtToken(token);

        return mypageService.modifyCheerMessage(cheerMessageRequestDto, member);
    }

    @Operation(summary = "응원 메시지 삭제", description = "마이페이지 안에 있는 응원 메시지 삭제 API")
    @DeleteMapping("/cheermsg/{cheerMessageId}")
    public BaseResponseDto deleteCheerMessage(@PathVariable Integer cheerMessageId) {
        return mypageService.deleteCheerMessage(cheerMessageId);
    }

    @Operation(summary = "디데이 작성", description = "마이페이지 안에 있는 D-day 작성 API")
    @PostMapping("/dday")
    public BaseResponseDto writeDday(HttpServletRequest httpServletRequest, @RequestBody DdayRequestDto ddayRequestDto) {

        String token = httpServletRequest.getHeader("Authorization");
        Member member = memberService.findMemberByJwtToken(token);

        return mypageService.writeDday(ddayRequestDto, member);
    }

    @Operation(summary = "디데이 수정", description = "마이페이지 안에 있는 D-day 수정 API")
    @PutMapping("/dday")
    public BaseResponseDto modifyDday(HttpServletRequest httpServletRequest, @RequestBody DdayModifyRequestDto ddayModifyRequestDto) {

        String token = httpServletRequest.getHeader("Authorization");
        Member member = memberService.findMemberByJwtToken(token);

        return mypageService.modifyDday(ddayModifyRequestDto, member);
    }

    @Operation(summary = "디데이 삭제", description = "마이페이지 안에 있는 D-day 삭제 API")
    @DeleteMapping("dday/{ddayId}")
    public BaseResponseDto deleteDday(@PathVariable Integer ddayId) {
        System.out.println(ddayId);
        return mypageService.deleteDday(ddayId);
    }
}
