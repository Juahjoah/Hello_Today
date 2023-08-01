package com.ssafy.hellotoday.db.entity.routine;

import com.ssafy.hellotoday.db.entity.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Override
    public String toString() {
        return "RoutineCheck{" +
                "routineCheckId=" + routineCheckId +
                ", routineDetailCat=" + routineDetailCat.getRoutineDetailCatId() +
                ", checkDaySeq=" + checkDaySeq +
                ", content='" + content + '\'' +
                ", imgPath='" + imgPath + '\'' +
                ", imgOriginalName='" + imgOriginalName + '\'' +
                '}';
    }

    public void update(RoutineCheck routineCheck, String fullPath) {
        this.content = routineCheck.getContent();
        this.imgPath = fullPath;
        this.imgOriginalName = routineCheck.getImgOriginalName();
        this.checkDate = LocalDateTime.now();
    }
}
