package com.ssafy.hellotoday.db.entity.mypage;

import com.ssafy.hellotoday.api.dto.mypage.request.CheerMessageModifyRequestDto;
import com.ssafy.hellotoday.db.entity.BaseEntity;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@ToString
public class CheerMessage extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cheerMessageId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Member writer;
    private String content;

    @Builder
    public CheerMessage(Integer cheerMessageId, Member member, Member writer, String content) {
        this.cheerMessageId = cheerMessageId;
        this.member = member;
        this.writer = writer;
        this.content = content;
    }

    public void update(CheerMessageModifyRequestDto cheerMessageModifyRequestDto, Member writer) {
        this.content = cheerMessageModifyRequestDto.getContent();
        this.writer = writer;
    }
}
