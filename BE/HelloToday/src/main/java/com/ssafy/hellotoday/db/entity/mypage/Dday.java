package com.ssafy.hellotoday.db.entity.mypage;

import com.ssafy.hellotoday.db.entity.BaseEntity;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.Builder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Dday extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ddayId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private LocalDateTime finalDate;
    private String content;
    @Enumerated(EnumType.STRING)
    private DdayType type;

    @Builder
    public Dday(Integer ddayId, Member member, LocalDateTime finalDate, String content, DdayType type) {
        this.ddayId = ddayId;
        this.member = member;
        this.finalDate = finalDate;
        this.content = content;
        this.type = type;
    }
}
