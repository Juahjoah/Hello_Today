package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.request.follow.FollowSaveRequestDto;
import com.ssafy.hellotoday.api.response.BaseResponseDto;
import com.ssafy.hellotoday.api.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Follow", description = "팔로우 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/follow")
public class FollowController {
    private final FollowService followService;

    @Operation(summary = "팔로우 등록", description = "로그인 한 회원이 팔로우를 신청하는 API")
    @PostMapping
    public BaseResponseDto enrollFollow(/*HttpServletRequest httpServletRequest,*/
                                                        @RequestBody FollowSaveRequestDto followSaveRequestDto) {

        // 로그인 한 사용자 정보 조회 -> 로그인 사용자 정보가 잘못됐을 시 에러 발생코드 추가돼야 함
//        String token = httpServletRequest.getHeader("Authorization");
//        Member member = memberService.findUserByJwtToken(token);

        return followService.enrollFollow(3, followSaveRequestDto);
    }

}
