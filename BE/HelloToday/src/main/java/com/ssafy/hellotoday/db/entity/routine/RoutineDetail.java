package com.ssafy.hellotoday.db.entity.routine;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_tag_id")
    private RoutineTag routineTag;
    private String content;
    private String imgPath;

    public RoutineDetail(Integer routineDetailId) {
        this.routineDetailId = routineDetailId;
    }
}
