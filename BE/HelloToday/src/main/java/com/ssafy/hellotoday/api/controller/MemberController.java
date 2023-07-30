package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.member.response.TokenDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

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
    public ResponseEntity<String> loginKakao(@RequestBody Map<String, String> codeRequest) {
        Member member = memberService.findKakaoMemberByAuthorizedCode(codeRequest.get("code"), redirectKakaoUrl);
        String accessToken = jwtTokenProvider.createAccessToken(member.getMemberId(), member.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getMemberId());
        jwtTokenProvider.storeRefreshToken(member.getMemberId(), refreshToken);

        return ResponseEntity.ok()
                .header("Authorization", accessToken)
                .header("Authorization-Refresh",refreshToken)
                .body("로그인 되었습니다.");
    }
    @Operation(summary = "네이버로 로그인 및 회원가입", description = "네이버로 로그인 하는 API")
    @PostMapping("/api/members/naver/login")
    public ResponseEntity<String> loginNaver(@RequestBody Map<String, String> codeRequest) {
        System.out.println("codeRequest = " + codeRequest.get("code"));
        Member member = memberService.findNaverMemberByAuthorizedCode(codeRequest.get("code"), naverState);

        String accessToken = jwtTokenProvider.createAccessToken(member.getMemberId(), member.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getMemberId());
        jwtTokenProvider.storeRefreshToken(member.getMemberId(), refreshToken);

        return ResponseEntity.ok()
                .header("Authorization", accessToken)
                .header("Authorization-Refresh",refreshToken)
                .body("로그인 되었습니다.");
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

    @GetMapping("/api/test")
    public ResponseEntity<String> tokenTest(HttpServletRequest httpServletRequest) {
        String accessToken = httpServletRequest.getHeader("Authorization");

        Member findMember = memberService.findMemberByJwtToken(accessToken);

        System.out.println(findMember.toString());


        return new ResponseEntity<>("TokenTest성공", HttpStatus.OK);
    }



}
