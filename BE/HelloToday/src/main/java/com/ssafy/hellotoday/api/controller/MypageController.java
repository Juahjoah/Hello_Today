package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.member.request.MemberInfoUpdateRequestDto;
import com.ssafy.hellotoday.api.dto.member.request.ShowInfoEditRequestDto;
import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import com.ssafy.hellotoday.api.dto.member.response.ShowInfoFlagsResponseDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.db.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "MyPage", description = "마이페이지 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/mypage")
@Slf4j
public class MypageController {

    private final MemberService memberService;



    //마이페이지 사용자 정보 조회
    @Operation(summary = "마이페이지 사용자 정보 조회", description = "사용자 정보(닉네임,상테메세지,프로필사진경로)")
    @GetMapping
    public MemberResponseDto defaultMemberInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.getMemberInfo(findMember);

    }
    //마이페이지 편집 모드
    @Operation(summary = "마이페이지 위젯 사용 여부 조회", description = "마이페이지 위젯 사용 여부를 알 수 있다(0:미사용.1:사용)")
    @GetMapping("/widget")
    public ShowInfoFlagsResponseDto myPageWidgetInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.getWidgetInfo(findMember);

    }

    @Operation(summary = "위젯 선택", description = "사용할려는 위젯 사용여부 업데이트")
    @PutMapping("/widget")
    public BaseResponseDto editWidget(@RequestBody ShowInfoEditRequestDto showInfoEditRequestDto, HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);


        return memberService.editShowInfo(findMember,showInfoEditRequestDto);
    }

    @Operation(summary = "사용자 정보 수정", description = "사용자정보(닉네임,상테메시지,프로필사진) 수정")
    @PutMapping("{id}")
    //마이페이지 편집 모드 사용자 정보 수정
    public BaseResponseDto updateMypage(@PathVariable Integer id,
                                               @RequestPart(name = "request",required = false) MemberInfoUpdateRequestDto mypageUpdateRequestDto,
                                               @RequestPart(value = "file", required = false) MultipartFile file,
                                               HttpServletRequest httpServletRequest) {

        if (mypageUpdateRequestDto != null) {

            mypageUpdateRequestDto.setFile(file);
        }
        log.info(String.valueOf(mypageUpdateRequestDto));

        String token = httpServletRequest.getHeader("Authorization");
        Member findMember = memberService.findMemberByJwtToken(token);


        return memberService.updateMemberInfo(id, mypageUpdateRequestDto, findMember,file);
    }






}
