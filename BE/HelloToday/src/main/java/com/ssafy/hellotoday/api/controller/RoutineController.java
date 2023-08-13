package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineCheckRequestDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineRequestDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineDetailResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutinePrivateCheckResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.TagResponseDto;
import com.ssafy.hellotoday.api.service.RoutineService;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.jwt.MemberDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Slf4j
@Tag(name = "Routine", description = "루틴 관련 API")
@RequiredArgsConstructor
@RestController
@EnableScheduling
@RequestMapping("/api/routine")
public class RoutineController {

    private final RoutineService routineService;

    @Operation(summary = "세분류 루틴 조회", description = "대분류 카테고리 별 세분류 루틴 조회 API")
    @GetMapping("/detail")
    public ResponseEntity<List<RoutineDetailResponseDto>> detailRoutine() {
        return new ResponseEntity<>(routineService.detailRoutine(), HttpStatus.OK);
    }

    @Operation(summary = "대분류 루틴 별 추천 멘트 조회", description = "대분류 카테고리 별 루틴 추천 멘트 조회 API")
    @GetMapping("/ment")
    public ResponseEntity<List<RoutineRecMentResponseDto>> getRecommendMent() {
        return new ResponseEntity<>(routineService.getRecommendMents(), HttpStatus.OK);
    }

    @Operation(summary = "개인 루틴 생성", description = "세분류 루틴 선택 이후 루틴 생성")
    @PostMapping("/private")
    public BaseResponseDto makeRoutine(@AuthenticationPrincipal MemberDetailsImpl member,
                                       @RequestBody RoutineRequestDto routineRequestDto) {

        return routineService.makeRoutine(routineRequestDto, member.getUser());
    }


    @Operation(summary = "개인 루틴 진행 현황", description = "현재 진행 중인 루틴인 있는 지에 대한 flag" +
            "                                               <br>진행 중인 루틴이 있다면 진행 중인 상세 루틴에 대한 인증 내역 출력 ")
    @GetMapping("/private")
    public ResponseEntity<RoutinePrivateCheckResponseDto> getPrivateRoutineCheck(
            @AuthenticationPrincipal MemberDetailsImpl member) {

        return new ResponseEntity<>(routineService.getPrivateRoutineCheck(member.getUser()), HttpStatus.OK);
    }

    @Operation(summary = "개인 루틴 인증 등록", description = "루틴인증(날짜(yyyy-MM-dd HH:mm:ss),내용,이미지(선택) 등록")
    @PutMapping("/private/check")
    public BaseResponseDto checkPrivateRoutine(
            @RequestPart(name = "request") Optional<RoutineCheckRequestDto> routineCheckRequestDto,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @AuthenticationPrincipal MemberDetailsImpl member) {

        RoutineCheckRequestDto routineCheckRequest = routineCheckRequestDto.orElse(null);

        if (routineCheckRequest != null) {
            routineCheckRequest.setFile(file);
        } else {
            throw new CustomException(HttpStatus.BAD_REQUEST, -1, "필수(날짜,내용) 내용이 없습니다");
        }

        return routineService.checkPrivateRoutine(routineCheckRequest, member.getUser(), file);
    }

    @Operation(summary = "루틴 태그 조회", description = "모든 루틴 태그 조회 API")
    @GetMapping("/tag")
    public List<TagResponseDto> getTags() {
        return routineService.getTags();
    }
}
