package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineCheckRequestDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineRequestDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineDetailResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutinePrivateCheckResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.api.service.MemberService;
import com.ssafy.hellotoday.api.service.RoutineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@Tag(name = "Routine", description = "루틴 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/routine")
public class RoutineController {

    private final RoutineService routineService;
    private final MemberService memberService;

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
    public BaseResponseDto makeRoutine(HttpServletRequest httpServletRequest, @RequestBody RoutineRequestDto routineRequestDto) {
        return routineService.makeRoutine(routineRequestDto);
    }


    @Operation(summary = "개인 루틴 진행 현황", description = "현재 진행 중인 루틴인 있는 지에 대한 flag" +
            "                                               <br>진행 중인 루틴이 있다면 진행 중인 상세 루틴에 대한 인증 내역 출력 ")
    @GetMapping("private/{memberId}")
    public ResponseEntity<RoutinePrivateCheckResponseDto> getPrivateRoutineCheck(@PathVariable Integer memberId) {
        return new ResponseEntity<>(routineService.getPrivateRoutineCheck(memberId), HttpStatus.OK);
    }

    @PutMapping("private/check")
    public void checkPrivateRoutine(@RequestBody RoutineCheckRequestDto routineCheckRequestDto) {
        System.out.println(routineCheckRequestDto.toString());
        routineService.checkPrivateRoutine(routineCheckRequestDto);
    }
}
