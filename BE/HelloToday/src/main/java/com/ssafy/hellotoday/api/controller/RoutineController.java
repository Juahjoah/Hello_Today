package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineRequestDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineDetailResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutinePrivateCheckResponseDto;
import com.ssafy.hellotoday.api.dto.routine.response.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.api.service.RoutineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "Routine", description = "루틴 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/routine")
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
    public BaseResponseDto makeRoutine(@RequestBody RoutineRequestDto routineRequestDto) {
        return routineService.makeRoutine(routineRequestDto);
    }

    @GetMapping("private/private/{memberId}")
    public ResponseEntity<RoutinePrivateCheckResponseDto> getPrivateRoutineCheck(@PathVariable Integer memberId) {
        return new ResponseEntity<>(routineService.getPrivateRoutineCheck(memberId), HttpStatus.OK);
    }
}
