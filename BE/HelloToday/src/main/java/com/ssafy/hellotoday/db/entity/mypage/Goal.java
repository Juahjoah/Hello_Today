package com.ssafy.hellotoday.db.entity.mypage;

import com.ssafy.hellotoday.api.dto.mypage.request.GoalRequestDto;
import com.ssafy.hellotoday.db.entity.BaseEntity;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Goal extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer goalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_Id")
    private Member member;

    private String type;

    private String content;


    @Builder
    public Goal(Member member, String type, String content) {
        this.member = member;
        this.type = type;
        this.content = content;
    }

    //목표 수정(내용)
    public void updateGoal(GoalRequestDto goalRequestDto) {
        this.content= goalRequestDto.getContent();
    }
}
