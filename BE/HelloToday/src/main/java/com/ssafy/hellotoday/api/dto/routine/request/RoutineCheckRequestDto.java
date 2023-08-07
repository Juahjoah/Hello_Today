package com.ssafy.hellotoday.api.dto.routine.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.hellotoday.api.dto.routine.RoutineCheckDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class RoutineCheckRequestDto {
    private Integer routineCheckId;
    private Integer checkDaySeq;
    private String content;
    private MultipartFile file;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime checkDate;

}
