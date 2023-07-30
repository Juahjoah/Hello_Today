package com.ssafy.hellotoday.db.entity.routine;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    @JsonBackReference
    private Routine routine;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_detail_id")
    private RoutineDetail routineDetail;

    @OneToMany(mappedBy = "routineDetailCat",cascade = CascadeType.ALL)
    private List<RoutineCheck> routineCheckList;

    @Builder
    public RoutineDetailCat(Integer routineDetailCatId, Routine routine, RoutineDetail routineDetail, List<RoutineCheck> routineCheckList) {
        this.routineDetailCatId = routineDetailCatId;
        this.routine = routine;
        this.routineDetail = routineDetail;
        this.routineCheckList = routineCheckList;
    }

    public static RoutineDetailCat createRoutineDetailCat(RoutineDetailDto routineDetailCatDto, Routine routine) {
        return RoutineDetailCat.builder()
                .routineDetail(new RoutineDetail(routineDetailCatDto.getRoutineDetailId()))
                .routine(routine)
                .routineCheckList(new ArrayList<>())
                .build();
    }

    public void addRoutineCheck(RoutineCheck routineCheck) {
        this.routineCheckList.add(routineCheck);
    }
}
