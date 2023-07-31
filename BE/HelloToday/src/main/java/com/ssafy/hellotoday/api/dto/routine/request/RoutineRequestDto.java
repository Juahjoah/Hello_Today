package com.ssafy.hellotoday.api.dto.routine.request;

import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.entity.routine.RoutineDetailCat;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class RoutineRequestDto {
    private Integer memberId;
    private List<RoutineDetailDto> routineDetailDtoList = new ArrayList<>();
}
