package com.ssafy.hellotoday.db.entity.routine;

import javax.persistence.*;

@Entity
public class RoutineDetailCat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineDetailCatId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_detail_id")
    private RoutineDetail routineDetail;
}
