package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.member.request.ShowInfoEditRequestDto;
import com.ssafy.hellotoday.api.dto.member.response.MemberInfoResponseDto;
import com.ssafy.hellotoday.api.dto.member.response.ShowInfoFlagsResponseDto;
import com.ssafy.hellotoday.api.dto.mypage.request.*;
import com.ssafy.hellotoday.api.dto.mypage.response.*;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineResponseDto;
import com.ssafy.hellotoday.api.dto.wishdiary.request.WishDiaryRequestDto;
import com.ssafy.hellotoday.api.dto.wishdiary.response.WishDiaryResponseDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.api.service.MypageService;
import com.ssafy.hellotoday.api.service.WishDiaryService;
import com.ssafy.hellotoday.db.entity.widget.wishdiary.Type;
import com.ssafy.hellotoday.jwt.MemberDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "MyPage", description = "마이페이지 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MypageController {

    private final MemberService memberService;
    private final MypageService mypageService;
    private final WishDiaryService wishDiaryService;

    //마이페이지 사용자 정보 조회
    @Operation(summary = "마이페이지 사용자 정보 조회", description = "사용자 정보(닉네임,상테메세지,프로필사진경로)")
    @GetMapping
    public MemberInfoResponseDto defaultMemberInfo(@AuthenticationPrincipal MemberDetailsImpl member) {

        return memberService.getMemberInfo(member.getUser());
    }

    //마이페이지 특정 사용자 정보 조회
    @Operation(summary = "마이페이지 특정 사용자 정보 조회", description = "특정 사용자 정보(닉네임,상테메세지,프로필사진경로)")
    @GetMapping("/{memberId}")
    public MemberInfoResponseDto DetailMemberInfo(@PathVariable Integer memberId) {

        return memberService.getDetailMemberInfo(memberId);

    }

    //마이페이지 편집 모드
    @Operation(summary = "마이페이지 위젯 사용 여부 조회", description = "마이페이지 위젯 사용 여부를 알 수 있다(0:미사용.1:사용)")
    @GetMapping("/widget")
    public ShowInfoFlagsResponseDto myPageWidgetInfo(@AuthenticationPrincipal MemberDetailsImpl member) {

        return memberService.getWidgetInfo(member.getUser());
    }

    @Operation(summary = "위젯 선택", description = "사용할려는 위젯 사용여부 업데이트")
    @PutMapping("/widget")
    public BaseResponseDto editWidget(@RequestBody ShowInfoEditRequestDto showInfoEditRequestDto,
                                      @AuthenticationPrincipal MemberDetailsImpl member) {

        return memberService.editShowInfo(member.getUser(), showInfoEditRequestDto);
    }

    @Operation(summary = "응원 메시지 조회", description = "마이페이지 내이 있는 전체 응원 메시지 조회<br>" +
            "page: 조회 페이지 번호(0부터 시작), size: 한 페이지 당 보일 개수")
    @GetMapping("/cheermsg/{memberId}")
    public List<CheerMessageResponseDto> getCheerMessages(@PathVariable Integer memberId,
                                                          @RequestParam("page") Integer page,
                                                          @RequestParam("size") Integer size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        return mypageService.getCheerMessages(memberId, pageRequest);
    }

    @Operation(summary = "응원 메시지 작성", description = "마이페이지 안에 있는 응원 메시지 작성 API")
    @PostMapping("/cheermsg")
    public BaseResponseDto writeCheerMessage(@AuthenticationPrincipal MemberDetailsImpl member,
                                             @RequestBody CheerMessageRequestDto cheerMsgRequestDto) {

        return mypageService.writeCheerMessage(cheerMsgRequestDto, member.getUser());
    }

    @Operation(summary = "응원 메시지 수정", description = "마이페이지 안에 있는 응원 메시지 수정 API")
    @PutMapping("/cheermsg")
    public BaseResponseDto modifyCheerMessage(@AuthenticationPrincipal MemberDetailsImpl member,
                                              @RequestBody CheerMessageModifyRequestDto cheerMessageRequestDto) {

        return mypageService.modifyCheerMessage(cheerMessageRequestDto, member.getUser());
    }

    @Operation(summary = "응원 메시지 삭제", description = "마이페이지 안에 있는 응원 메시지 삭제 API")
    @DeleteMapping("/cheermsg/{cheerMessageId}")
    public BaseResponseDto deleteCheerMessage(@PathVariable Integer cheerMessageId,
                                              @AuthenticationPrincipal MemberDetailsImpl member) {

        return mypageService.deleteCheerMessage(member.getUser().getMemberId(), cheerMessageId);
    }

    @Operation(summary = "디데이 조회", description = "마이페이지 안에 있는 D-day 조회 API")
    @GetMapping("/dday/{memberId}")
    public List<DdayResponseDto> getDdays(@PathVariable Integer memberId) {
        return mypageService.getDdays(memberId);
    }

    @Operation(summary = "디데이 작성", description = "마이페이지 안에 있는 D-day 작성 API")
    @PostMapping("/dday")
    public BaseResponseDto writeDday(@AuthenticationPrincipal MemberDetailsImpl member,
                                     @RequestBody DdayRequestDto ddayRequestDto) {

        return mypageService.writeDday(ddayRequestDto, member.getUser());
    }

    @Operation(summary = "디데이 수정", description = "마이페이지 안에 있는 D-day 수정 API")
    @PutMapping("/dday")
    public BaseResponseDto modifyDday(@AuthenticationPrincipal MemberDetailsImpl member,
                                      @RequestBody DdayModifyRequestDto ddayModifyRequestDto) {

        return mypageService.modifyDday(ddayModifyRequestDto, member.getUser());
    }

    @Operation(summary = "디데이 삭제", description = "마이페이지 안에 있는 D-day 삭제 API")
    @DeleteMapping("/dday/{ddayId}")
    public BaseResponseDto deleteDday(@PathVariable Integer ddayId,
                                      @AuthenticationPrincipal MemberDetailsImpl member) {

        return mypageService.deleteDday(member.getUser().getMemberId(), ddayId);
    }

    @Operation(summary = "버킷리스트 전체 조회", description = "버킷리스트 전체 조회")
    @GetMapping("/bucketlist")
    public List<WishDiaryResponseDto> getBucketList(@AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.getWishDiary(member.getUser(), Type.BUCKETLIST);
    }

    @Operation(summary = "한줄 일기 전체 조회", description = "한줄 일기 전체 조회")
    @GetMapping("/onediary")
    public List<WishDiaryResponseDto> getOneDiary(@AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.getWishDiary(member.getUser(), Type.ONEDIARY);
    }


    @Operation(summary = "버킷리스트 작성", description = "버킷리스트 작성")
    @PostMapping("/bucketlist")
    public BaseResponseDto writeBucketList(@RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                           @AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.writeBucketDiary(member.getUser(), wishDiaryUpdateRequestDto, Type.BUCKETLIST);
    }

    @Operation(summary = "한줄일기 작성", description = "한줄일기 작성")
    @PostMapping("/onediary")
    public BaseResponseDto writeOneDiary(@RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                         @AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.writeBucketDiary(member.getUser(), wishDiaryUpdateRequestDto, Type.ONEDIARY);
    }

    @Operation(summary = "버킷리스트 내용 수정", description = "버킷리스트 내용 수정")
    @PutMapping("/bucketlist/{bucketListId}")
    public BaseResponseDto updateBucketList(@PathVariable Integer bucketListId,
                                            @RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                            @AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.updateBucketDiary(bucketListId, member.getUser(),
                wishDiaryUpdateRequestDto, Type.BUCKETLIST);
    }

    @Operation(summary = "한 줄 일기 내용 수정", description = "한 줄 일기 내용 수정")
    @PutMapping("/onediary/{oneDiaryId}")
    public BaseResponseDto updateOneDairy(@PathVariable Integer oneDiaryId,
                                          @RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                          @AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.updateBucketDiary(oneDiaryId, member.getUser(),
                wishDiaryUpdateRequestDto, Type.ONEDIARY);
    }

    @Operation(summary = "버킷리스트 내용 삭제", description = "버킷리스트 내용 삭제")
    @DeleteMapping("/bucketlist/{bucketListId}")
    public BaseResponseDto deleteBucketList(@PathVariable Integer bucketListId,
                                            @AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.deleteWishDiary(bucketListId, member.getUser(), Type.BUCKETLIST);
    }


    @Operation(summary = "한줄 일기 내용 삭제", description = "한줄 일기 내용 삭제")
    @DeleteMapping("/onediary/{oneDiaryId}")
    public BaseResponseDto deleteOneDiary(@PathVariable Integer oneDiaryId,
                                          @AuthenticationPrincipal MemberDetailsImpl member) {

        return wishDiaryService.deleteWishDiary(oneDiaryId, member.getUser(), Type.ONEDIARY);

    }

    @Operation(summary = "캘린더 내 루틴 조회", description = "캘린더 내 루틴의 시작, 종료일자")
    @GetMapping("/calendar/{memberId}")
    public List<RoutineResponseDto> getCalendarRoutine(@PathVariable Integer memberId) {
        return mypageService.getCalendar(memberId);
    }

    @Operation(summary = "캘린더 내 루틴 상세 조회",
            description = "캘린더에 있는 루틴의 날짜를 눌렀을 때<br>writeDate: 인증을 한 날짜! (루틴이 진행된 날짜와는 별개)")
    @GetMapping("/calendar/{memberId}/{checkDate}")
    public List<CalendarHistoryDetailResponseDto> getCalendarRoutineDetail(@PathVariable Integer memberId,
                                                                           @DateTimeFormat(pattern = "yyyy-MM-dd")
                                                                           @PathVariable LocalDate checkDate) {
        return mypageService.getCalendarRoutineDetail(memberId, checkDate);
    }

    @Operation(summary = "루틴 히스토리 조회", description = "마이페이지 안에 있는 루틴 히스토리")
    @GetMapping("/routinehistory/{memberId}")
    public List<RoutineHistoryResponseDto> getRoutineHistory(@PathVariable Integer memberId,
                                                             @RequestParam("page") Integer page,
                                                             @RequestParam("size") Integer size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        return mypageService.getRoutineHistory(memberId, pageRequest);

    }

    @Operation(summary = "루틴 히스토리 상세 조회", description = "루틴 히스토리 디데일을 조회하는 API")
    @GetMapping("routinehistory/{memberId}/{routineId}")
    public List<RoutineDetailHistoryResponseDto> getRoutineHistoryDetail(@PathVariable Integer routineId) {
        return mypageService.getRoutineHistoryDetail(routineId);
    }

    @Operation(summary = "갤러리 조회", description = "마이페이지 안에 있는 갤러리 조회")
    @GetMapping("/gallery/{memberId}")
    public List<GalleryResponseDto> getGallery(@PathVariable Integer memberId) {

        return mypageService.getGallery(memberId);
    }

    @Operation(summary = "목표 전체 조회", description = "목표 전체 조회 type(0:매일,1:매주,2:매년) header에 accessToken 필요")
    @GetMapping("/goal")
    public List<GoalResponseDto> getGoal(@AuthenticationPrincipal MemberDetailsImpl member) {

        return mypageService.getGoal(member.getUser());
    }


    @Operation(summary = "목표 작성", description = "목표 작성 type(0:매일,1:매주,2:매년) header에 accessToken 필요")
    @PostMapping("/goal")
    public BaseResponseDto writeGoal(@RequestBody GoalRequestDto goalRequestDto,
                                     @AuthenticationPrincipal MemberDetailsImpl member) {

        return mypageService.writeGoal(member.getUser(), goalRequestDto);
    }

    @Operation(summary = "목표 수정", description = "목표 수정 type(0:매일,1:매주,2:매년) header에 accessToken 필요")
    @PutMapping("/goal/{goalId}")
    public BaseResponseDto updateGoal(@PathVariable Integer goalId,@RequestBody GoalRequestDto goalRequestDto,
                                      @AuthenticationPrincipal MemberDetailsImpl member) {

        return mypageService.updateGoal(goalId,member.getUser(), goalRequestDto);
    }

    @Operation(summary = "목표 삭제", description = "목표 삭제 type(0:매일,1:매주,2:매년) header에 accessToken 필요")
    @DeleteMapping("/goal/{goalId}")
    public BaseResponseDto deleteGoal(@PathVariable Integer goalId,
                                      @AuthenticationPrincipal MemberDetailsImpl member) {

        return mypageService.deleteGoal(goalId,member.getUser());
    }
}
