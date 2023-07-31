package com.ssafy.hellotoday.db.entity.routine;

import com.ssafy.hellotoday.db.entity.Member;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
public class Routine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private byte activeFlag;

    @OneToMany(mappedBy = "routineDetail")
    private List<RoutineDetailCat> routineDetailCats = new ArrayList<>();

    @Builder
    public Routine(Integer routineId, Member member, LocalDateTime startDate, LocalDateTime endDate, byte activeFlag, List<RoutineDetailCat> routineDetailCats) {
        this.member = member;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activeFlag = activeFlag;
        this.routineDetailCats = routineDetailCats;
    }
}
