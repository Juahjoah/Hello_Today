package com.ssafy.hellotoday.db.entity.widget.wishdiary;

import com.ssafy.hellotoday.api.dto.wishdiary.request.WishDiaryRequestDto;
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
public class WishDiary extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wishDiaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_Id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String content;
    @Builder
    public WishDiary(Member member, Type type, String content) {
        this.member = member;
        this.type = type;
        this.content = content;
    }

//위시다이어리 수정(내용)
    public void updateWishDiary(WishDiaryRequestDto wishDiaryUpdateRequestDto) {
        this.content = wishDiaryUpdateRequestDto.getContent();
    }
}
