package com.ssafy.hellotoday.db.entity.routine;

import com.ssafy.hellotoday.db.entity.BaseEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
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

    @Builder
    public RoutineCheck(Integer routineCheckId, RoutineDetailCat routineDetailCat, Integer checkDaySeq, String content, String imgPath, String imgOriginalName) {
        this.routineCheckId = routineCheckId;
        this.routineDetailCat = routineDetailCat;
        this.checkDaySeq = checkDaySeq;
        this.content = content;
        this.imgPath = imgPath;
        this.imgOriginalName = imgOriginalName;
    }

    public static RoutineCheck createRoutineCheck(Integer checkDaySeq, String content, String imgPath, String imgOriginalName, RoutineDetailCat routineDetailCat) {
        return RoutineCheck.builder()
                .checkDaySeq(checkDaySeq)
                .content(content)
                .imgPath(imgPath)
                .imgOriginalName(imgOriginalName)
                .routineDetailCat(routineDetailCat)
                .build();
    }
}
