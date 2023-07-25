package com.ssafy.hellotoday.api.request.routine;

import java.time.LocalDateTime;

public class RoutineRequestDto {
    private Integer routineId;
    private Integer memberId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean activeFlag;

}
