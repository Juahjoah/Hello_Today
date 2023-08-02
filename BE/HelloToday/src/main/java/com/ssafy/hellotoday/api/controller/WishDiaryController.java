package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.wishdiary.request.WishDiaryRequestDto;
import com.ssafy.hellotoday.api.dto.wishdiary.response.WishDiaryResponseDto;
import com.ssafy.hellotoday.api.service.WishDiaryService;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.widget.wishdiary.Type;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Tag(name = "BucketList&Diary", description = "버킷리스트과 한줄 일기 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/mypage")
@Slf4j
public class WishDiaryController {

    private final MemberService memberService;
    private final WishDiaryService wishDiaryService;

    @Operation(summary = "버킷리스트 전체 조회", description = "버킷리스트 전체 조회")
    @GetMapping("/bucketlist")
    public List<WishDiaryResponseDto> getBucketList(HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return wishDiaryService.getWishDiary(findMember,Type.BUCKETLIST);
    }

    @Operation(summary = "한줄 일기 전체 조회", description = "한줄 일기 전체 조회")
    @GetMapping("/onediary")
    public List<WishDiaryResponseDto> getOneDiary(HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return wishDiaryService.getWishDiary(findMember,Type.ONEDIARY);
    }


    @Operation(summary = "버킷리스트 작성", description = "버킷리스트 작성")
    @PostMapping("/bucketlist")
    public BaseResponseDto writeBucketList(@RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                           HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return wishDiaryService.writeBucketDiary(findMember, wishDiaryUpdateRequestDto,Type.BUCKETLIST);
    }

    @Operation(summary = "한줄일기 작성", description = "한줄일기 작성")
    @PostMapping("/onediary")
    public BaseResponseDto writeOneDiary(@RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                         HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return wishDiaryService.writeBucketDiary(findMember, wishDiaryUpdateRequestDto,Type.ONEDIARY);
    }

    @Operation(summary = "버킷리스트 내용 수정", description = "버킷리스트 내용 수정")
    @PutMapping("/bucketlist/{id}")
    public BaseResponseDto updateBucketList(@PathVariable Integer id, @RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                            HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return wishDiaryService.updateBucketDiary(id, findMember, wishDiaryUpdateRequestDto,Type.BUCKETLIST);
    }

    @Operation(summary = "한 줄 일기 내용 수정", description = "한 줄 일기 내용 수정")
    @PutMapping("/onediary/{id}")
    public BaseResponseDto updateOneDairy(@PathVariable Integer id, @RequestBody WishDiaryRequestDto wishDiaryUpdateRequestDto,
                                          HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return wishDiaryService.updateBucketDiary(id, findMember, wishDiaryUpdateRequestDto,Type.ONEDIARY);
    }

    @Operation(summary = "버킷리스트 내용 삭제", description = "버킷리스트 내용 삭제")
    @DeleteMapping("/bucketlist/{id}")
    public BaseResponseDto deleteBucketList(@PathVariable Integer id, HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);
        return wishDiaryService.deleteWishDiary(id,findMember,Type.BUCKETLIST);

         }


    @Operation(summary = "한줄 일기 내용 삭제", description = "한줄 일기 내용 삭제")
    @DeleteMapping("/onediary/{id}")
    public BaseResponseDto deleteOneDiary(@PathVariable Integer id, HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return wishDiaryService.deleteWishDiary(id,findMember, Type.ONEDIARY);

    }
}
