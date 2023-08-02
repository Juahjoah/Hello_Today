package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.member.response.MemberResponseDto;
import com.ssafy.hellotoday.api.dto.member.response.ShowInfoFlagsResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayModifyRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.request.DdayRequestDto;
import com.ssafy.hellotoday.api.dto.mypage.response.CheerMessageResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.response.DdayResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.api.service.MypageService;
import com.ssafy.hellotoday.db.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Tag(name = "MyPage", description = "마이페이지 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/members")
public class MypageController {

    private final MemberService memberService;
    private final MypageService mypageService;



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
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.getWidgetInfo(findMember);
    }

    @Operation(summary = "응원 메시지 조회", description = "마이페이지 내이 있는 전체 응원 메시지 조회<br>" +
                                                        "page: 조회 페이지 번호(0부터 시작), size: 한 페이지 당 보일 개수")
    @GetMapping("/cheermsg/{memberId}")
    public List<CheerMessageResponseDto> getCheerMessages(@PathVariable Integer memberId, @RequestParam("page") Integer page, @RequestParam("size") Integer size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        return mypageService.getCheerMessages(memberId, pageRequest);
    }

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

    @Operation(summary = "디데이 조회", description = "마이페이지 안에 있는 D-day 조회 API")
    @GetMapping("/dday/{memberId}")
    public List<DdayResponseDto> getDdays(@PathVariable Integer memberId) {
        return mypageService.getDdays(memberId);
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
    @DeleteMapping("/dday/{ddayId}")
    public BaseResponseDto deleteDday(@PathVariable Integer ddayId) {
        return mypageService.deleteDday(ddayId);
    }

    @Operation(summary = "루틴 히스토리 조회", description = "마이페이지 내이 있는 루틴 히스토리 조회 API")
    @GetMapping("/routinehistory/{memberId}")
    public List<RoutineResponseDto> getRoutineHistory(@PathVariable Integer memberId) {
        return mypageService.getRoutineHistory(memberId);
    }
}
