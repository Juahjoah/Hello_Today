package com.ssafy.hellotoday.db.entity.routine;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.hellotoday.api.dto.member.FileDto;
import com.ssafy.hellotoday.api.dto.routine.RoutineCheckDto;
import com.ssafy.hellotoday.api.dto.routine.request.RoutineCheckRequestDto;
import com.ssafy.hellotoday.common.util.property.ApplicationProperties;
import com.ssafy.hellotoday.db.entity.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
public class RoutineCheck extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineCheckId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_detail_cat_id")
    private RoutineDetailCat routineDetailCat;
    private Integer checkDaySeq;
    private String content;
    private String imgPath;
    private String imgOriginalName;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime checkDate;

    @Builder
    public RoutineCheck(Integer routineCheckId, RoutineDetailCat routineDetailCat, Integer checkDaySeq, String content, String imgPath, String imgOriginalName, LocalDateTime checkDate) {
        this.routineCheckId = routineCheckId;
        this.routineDetailCat = routineDetailCat;
        this.checkDaySeq = checkDaySeq;
        this.content = content;
        this.imgPath = imgPath;
        this.imgOriginalName = imgOriginalName;
        this.checkDate = checkDate;
    }

    public static RoutineCheck createRoutineCheck(Integer checkDaySeq, String content, String imgPath, String imgOriginalName, RoutineDetailCat routineDetailCat, LocalDateTime checkDate) {
        return RoutineCheck.builder()
                .checkDaySeq(checkDaySeq)
                .content(content)
                .imgPath(imgPath)
                .imgOriginalName(imgOriginalName)
                .routineDetailCat(routineDetailCat)
                .checkDate(checkDate)
                .build();
    }

    public void update(RoutineCheckRequestDto routineCheckRequestDto, FileDto fileDto) {
        this.content = routineCheckRequestDto.getContent();
        this.imgPath = fileDto.getFilePath();
        this.imgOriginalName = fileDto.getFileOriginalName();
        this.checkDate = routineCheckRequestDto.getCheckDate();
    }

    public void update(RoutineCheckRequestDto routineCheckRequestDto) {
        this.checkDaySeq = routineCheckRequestDto.getCheckDaySeq();
        this.content = routineCheckRequestDto.getContent();
        this.checkDate = routineCheckRequestDto.getCheckDate();
    }

    public String getRoutineImagePath() {
        if(imgPath == null) return null;

        return ApplicationProperties.HOST_IMAGE_URL + "routine/" + imgOriginalName;
    }
}
