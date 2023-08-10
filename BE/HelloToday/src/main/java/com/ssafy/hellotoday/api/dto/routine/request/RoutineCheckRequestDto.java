package com.ssafy.hellotoday.api.dto.routine.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

@Getter
@Setter
public class RoutineCheckRequestDto {

    private Integer checkDaySeq;
    private Integer routineDetailId;
    private Integer routineId;
    private String content;
    private MultipartFile file;
    private LocalDateTime checkDate;

}
