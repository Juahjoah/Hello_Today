package com.ssafy.hellotoday.db.entity.routine;

import com.ssafy.hellotoday.db.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
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
}
