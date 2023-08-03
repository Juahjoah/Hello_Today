package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.member.LoginDto;
import com.ssafy.hellotoday.api.dto.member.TokenDto;
import com.ssafy.hellotoday.api.dto.member.request.LoginRequestDto;
import com.ssafy.hellotoday.api.dto.member.request.MemberInfoUpdateRequestDto;
import com.ssafy.hellotoday.api.dto.member.request.NickNameRequestDto;
import com.ssafy.hellotoday.api.dto.member.response.LoginResponseDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Tag(name = "Member", description = "멤버 관련 API")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    @Value("${oauth2.kakao.redirect-uri}")
    private String redirectKakaoUrl;

    @Value("${oauth2.naver.state}")
    private String naverState;


    // 회원가입 또는 로그인
    @Operation(summary = "카카오로 로그인 및 회원가입", description = "카카오로 로그인 및 회원가입 하는 API")
    @PostMapping("/api/members/kakao/login")
    public ResponseEntity<LoginResponseDto> loginKakao(@RequestBody LoginRequestDto codeRequest) {
        LoginDto member = memberService.findKakaoMemberByAuthorizedCode(codeRequest.getCode(), redirectKakaoUrl);


        String accessToken = jwtTokenProvider.createAccessToken(member.getMemberId(), member.getSocialId(), member.getSocialType());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getMemberId());
        jwtTokenProvider.storeRefreshToken(member.getMemberId(), refreshToken);

        return ResponseEntity.ok()
                .header("Authorization", accessToken)
                .header("Authorization-Refresh",refreshToken)
                .body(LoginResponseDto.builder()
                        .message("카카오 로그인을 성공하셨습니다")
                        .memberId(member.getMemberId())
                        .firstLogin(member.isFirstLogin())
                        .build());
    }
    @Operation(summary = "네이버로 로그인 및 회원가입", description = "네이버로 로그인 하는 API")
    @PostMapping("/api/members/naver/login")
    public ResponseEntity<LoginResponseDto> loginNaver(@RequestBody LoginRequestDto codeRequest) {
        LoginDto member = memberService.findNaverMemberByAuthorizedCode(codeRequest.getCode(), naverState);

        String accessToken = jwtTokenProvider.createAccessToken(member.getMemberId(), member.getSocialId(),member.getSocialType());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getMemberId());
        jwtTokenProvider.storeRefreshToken(member.getMemberId(), refreshToken);

        return ResponseEntity.ok()
                .header("Authorization", accessToken)
                .header("Authorization-Refresh",refreshToken)
                .body(LoginResponseDto.builder()
                        .message("네이버 로그인을 성공하셨습니다")
                        .memberId(member.getMemberId())
                        .firstLogin(member.isFirstLogin())
                        .build());
    }
    @Operation(summary = "access&refresh 토큰 재발급", description = "access토큰 만료되면 refresh 토큰을 이용하여 재발급하는 API")
    @GetMapping("/api/members/reissue")
    public ResponseEntity<String> reissue(HttpServletRequest httpServletRequest) {
        String refreshToken = httpServletRequest.getHeader("Authorization-Refresh");

        System.out.println("refreshToken = " + refreshToken);
        TokenDto tokenDto = memberService.reissue(refreshToken);


        return  ResponseEntity.ok()
                .header("Authorization", tokenDto.getAccessToken())
                .header("Authorization-Refresh",tokenDto.getRefreshToken())
                .body("refresh과 accesstoken 재발급 성공하였습니다.");
    }

    @Operation(summary = "멤버 정보 수정", description = "멤버 정보(프로필,닉네임,상태메시지) 수정")
    @PutMapping("/api/members/{id}")
    private BaseResponseDto updateMemberInfo(@PathVariable Integer id,
                                             @RequestPart(name = "request",required = false) MemberInfoUpdateRequestDto memberInfoUpdateRequestDto,
                                             @RequestParam(value = "file",required = false) MultipartFile file
            ,HttpServletRequest httpServletRequest) {

        if (memberInfoUpdateRequestDto != null) {

            memberInfoUpdateRequestDto.setFile(file);
        }
        String token = httpServletRequest.getHeader("Authorization");
        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.updateMemberInfo(id,memberInfoUpdateRequestDto,findMember, file);
    }

    @Operation(summary = "닉네임 설정", description = "닉네임 설정")
    @PutMapping("/api/members/nickname")
    private BaseResponseDto setNickname(@RequestBody NickNameRequestDto nickNameRequestDto,
                                        HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.updateNickname(nickNameRequestDto.getNickname(),findMember);
    }

    @Operation(summary = "닉네임 중복 검사", description = "닉네임 중복 검사")
    @GetMapping("/api/members/nickname")
    private BaseResponseDto validNickname(@RequestBody NickNameRequestDto nickNameRequestDto,
                                        HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.validNickname(nickNameRequestDto.getNickname(),findMember);
    }



    @GetMapping("/api/test")
    public ResponseEntity<String> tokenTest() {


        return new ResponseEntity<>("TokenTest성공", HttpStatus.OK);
    }


}
