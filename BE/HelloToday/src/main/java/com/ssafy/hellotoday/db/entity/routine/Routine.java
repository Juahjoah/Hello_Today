package com.ssafy.hellotoday.db.entity.routine;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
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

    @OneToMany(mappedBy = "routine", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<RoutineDetailCat> routineDetailCats = new ArrayList<>();

    @Builder
    public Routine(Member member, LocalDateTime startDate, LocalDateTime endDate, byte activeFlag, List<RoutineDetailCat> routineDetailCats) {
        this.member = member;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activeFlag = activeFlag;
    }

    public static Routine createRoutine(Integer memberId, LocalDateTime startDate,
                                        LocalDateTime endDate,
                                        byte activeFlag) {
        return Routine.builder()
                .member(new Member(memberId))
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(7))
                .activeFlag((byte) 1)
                .build();
    }

    public void addRoutineDetailCat(RoutineDetailCat routineDetailCat) {
        this.routineDetailCats.add(routineDetailCat);
    }

    public void update(int i) {
        this.activeFlag = (byte) i;
    }
}
