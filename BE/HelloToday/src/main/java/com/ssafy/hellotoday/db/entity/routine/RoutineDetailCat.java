package com.ssafy.hellotoday.db.entity.routine;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
public class RoutineDetailCat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineDetailCatId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_detail_id")
    private RoutineDetail routineDetail;

    @Builder
    public RoutineDetailCat(Integer routineDetailCatId, Routine routine, RoutineDetail routineDetail) {
        this.routineDetailCatId = routineDetailCatId;
        this.routine = routine;
        this.routineDetail = routineDetail;
    }
}
