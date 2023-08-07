package com.ssafy.hellotoday.api.dto.member.response;

import com.ssafy.hellotoday.db.entity.ShowInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ShowInfoFlagsResponseDto {

    private Integer memberId;
    private byte goalFlag;
    private byte oneDiaryFlag;
    private byte wishListFlag;
    private byte routineHistoryFlag;
    private byte ddayFlag;
    private byte galleryFlag;

    @Builder
    public ShowInfoFlagsResponseDto(ShowInfo showinfo) {
        this.memberId = showinfo.getMember().getMemberId();
        this.goalFlag = showinfo.getGoalFlag();
        this.oneDiaryFlag = showinfo.getOneDiaryFlag();
        this.wishListFlag = showinfo.getWishListFlag();
        this.routineHistoryFlag = showinfo.getRoutineHistoryFlag();
        this.ddayFlag = showinfo.getDdayFlag();
        this.galleryFlag = showinfo.getGalleryFlag();
    }
}
