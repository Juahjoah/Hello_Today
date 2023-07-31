package com.ssafy.hellotoday.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ShowInfo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showInfoId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private byte goalFlag;
    private byte cheerMessageFlag;
    private byte oneDiaryFlag;
    private byte wishListFlag;
    private byte routineHistoryFlag;
    private byte ddayFlag;
    private byte galleryFlag;
    @Builder
    public ShowInfo(Member member) {
        this.member = member;
        this.goalFlag = 1;
        this.cheerMessageFlag = 1;
        this.oneDiaryFlag = 1;
        this.wishListFlag = 1;
        this.routineHistoryFlag = 1;
        this.ddayFlag = 1;
        this.galleryFlag = 1;
    }

    @Builder
    public ShowInfo(ShowInfo showInfo) {
        this.showInfoId = showInfo.getShowInfoId();
        this.member = showInfo.getMember();
        this.goalFlag = showInfo.getGoalFlag();
        this.cheerMessageFlag = showInfo.getCheerMessageFlag();
        this.oneDiaryFlag = showInfo.getOneDiaryFlag();
        this.wishListFlag = showInfo.getWishListFlag();
        this.routineHistoryFlag = showInfo.getRoutineHistoryFlag();
        this.ddayFlag = showInfo.getDdayFlag();
        this.galleryFlag = showInfo.getGalleryFlag();
    }
}
