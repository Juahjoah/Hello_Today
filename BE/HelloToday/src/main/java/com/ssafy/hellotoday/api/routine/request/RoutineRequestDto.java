package com.ssafy.hellotoday.api.routine.request;

import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetailCat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class RoutineRequestDto {
    private Integer memberId;
    private List<RoutineDetailCat> routineDetailDtoList = new ArrayList<>();
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // RoutineRequestDto로 받은 객체를 entity화하여 저장하는 용도
    public Routine toEntity() {
        return Routine.builder()
                .member(new Member(memberId))
                .routineDetailCats(routineDetailDtoList)
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(7))
                .build();
    }
}
