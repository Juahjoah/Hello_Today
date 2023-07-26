package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.response.routine.RoutineDetailResponseDto;
import com.ssafy.hellotoday.api.response.routine.RoutineRecMentResponseDto;
import com.ssafy.hellotoday.api.service.RoutineService;
import com.ssafy.hellotoday.db.entity.routine.RecommendMent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@Tag(name = "Routine", description = "루틴 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/routine")
public class RoutineController {

    private final RoutineService routineService;

    @Operation(summary = "세분류 루틴 조회", description = "대분류 카테고리 별 세분류 루틴 조회 API<br>{categoryId} 1: 기본, 2: 정적, 3: 동적")
    @GetMapping("/detail/{categoryId}")
    public ResponseEntity<List<RoutineDetailResponseDto>> detailRoutine(@PathVariable Integer categoryId) {
        return new ResponseEntity<>(routineService.detailRoutine(categoryId), HttpStatus.OK);
    }

    @Operation(summary = "대분류 루틴 별 추천 멘트 조회", description = "대분류 카테고리 별 루틴 추천 멘트 조회 API")
    @GetMapping("/ment")
    public ResponseEntity<List<RoutineRecMentResponseDto>> getRecommendMent() {
        return new ResponseEntity<>(routineService.getRecommendMents(), HttpStatus.OK);
    }

}
