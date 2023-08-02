package com.ssafy.hellotoday.api.dto.member.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ShowInfoEditRequestDto {

    private byte goalFlag;
    private byte oneDiaryFlag;
    private byte wishListFlag;
    private byte routineHistoryFlag;
    private byte ddayFlag;
    private byte galleryFlag;

    @Builder
    public ShowInfoEditRequestDto(byte goalFlag, byte oneDiaryFlag, byte wishListFlag, byte routineHistoryFlag, byte ddayFlag, byte galleryFlag) {
        this.goalFlag = goalFlag;
        this.oneDiaryFlag = oneDiaryFlag;
        this.wishListFlag = wishListFlag;
        this.routineHistoryFlag = routineHistoryFlag;
        this.ddayFlag = ddayFlag;
        this.galleryFlag = galleryFlag;
    }
}
