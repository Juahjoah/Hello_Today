package com.ssafy.hellotoday.api.dto.member.response;

import lombok.Builder;
import lombok.Getter;

@Getter

public class ShowInfoFlagsResponse {

    private byte goalFlag;
    private byte cheerMessageFlag;
    private byte oneDiaryFlag;
    private byte wishListFlag;
    private byte routineHistoryFlag;
    private byte ddayFlag;
    private byte galleryFlag;

    @Builder
    public ShowInfoFlagsResponse(byte goalFlag, byte cheerMessageFlag, byte oneDiaryFlag, byte wishListFlag, byte routineHistoryFlag, byte ddayFlag, byte galleryFlag) {
        this.goalFlag = goalFlag;
        this.cheerMessageFlag = cheerMessageFlag;
        this.oneDiaryFlag = oneDiaryFlag;
        this.wishListFlag = wishListFlag;
        this.routineHistoryFlag = routineHistoryFlag;
        this.ddayFlag = ddayFlag;
        this.galleryFlag = galleryFlag;
    }
}
