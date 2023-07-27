package com.ssafy.hellotoday.api.dto.routine.request;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetailCat;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ToString
@Getter
public class RoutineRequestDto {
    private Integer memberId;
    private List<RoutineDetailDto> routineDetailDtoList = new ArrayList<>();
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // RoutineRequestDto로 받은 객체를 entity화하여 저장하는 용도
    public Routine toEntity() {
        List<RoutineDetailCat> routineDetailCats = routineDetailDtoList.stream()
                .map(RoutineDetailDto::toRoutineDetailCat)
                .collect(Collectors.toList());

        return Routine.builder()
                .member(new Member(memberId))
                .routineDetailCats(routineDetailCats)
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(7))
                .build();
    }


}
