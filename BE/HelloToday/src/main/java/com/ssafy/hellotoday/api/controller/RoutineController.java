package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.request.routine.RoutineRequestDto;
import com.ssafy.hellotoday.api.response.routine.RoutineDetailResponseDto;
import com.ssafy.hellotoday.api.service.RoutineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/routine")
public class RoutineController {

    private final RoutineService routineService;

    /**
     * 루틴 대분류 별 세분류 루틴 조회
     * /1: 기본, /2: 정적, /3: 동적
     */
    @GetMapping("/detail/{categoryId}")
    public ResponseEntity<List<RoutineDetailResponseDto>> detailRoutine(@PathVariable Integer categoryId) {
        return new ResponseEntity<>(routineService.detailRoutine(categoryId), HttpStatus.OK);
    }
}
