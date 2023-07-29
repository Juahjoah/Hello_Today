package com.ssafy.hellotoday.db.entity.routine;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.CascadeType.ALL;

@Entity
@Setter
@Getter
@ToString
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

    public static RoutineDetailCat createRoutineDetailCat(RoutineDetailDto routineDetailCatDto, Routine routine) {
        return RoutineDetailCat.builder()
                .routineDetail(new RoutineDetail(routineDetailCatDto.getRoutineDetailId()))
                .routine(routine)
                .build();
    }
}
