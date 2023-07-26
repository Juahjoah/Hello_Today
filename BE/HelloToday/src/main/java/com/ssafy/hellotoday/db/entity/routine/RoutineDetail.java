package com.ssafy.hellotoday.db.entity.routine;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class RoutineDetail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineDetailId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_big_cat_id")
    private RoutineBigCat routineBigCat;
    private Integer routineTagId;
    private String content;
    private String imgPath;
}
