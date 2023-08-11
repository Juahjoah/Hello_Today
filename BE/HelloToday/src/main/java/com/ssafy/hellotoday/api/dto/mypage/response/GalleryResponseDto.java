package com.ssafy.hellotoday.api.dto.mypage.response;

import com.ssafy.hellotoday.common.util.property.ApplicationProperties;
import lombok.Getter;

@Getter
public class GalleryResponseDto {
    private String imgPath;

    public GalleryResponseDto(String imgOriginalName) {
        this.imgPath = getRoutineCheckImagePath(imgOriginalName);
    }

    public String getRoutineCheckImagePath(String imgOriginalName) {
        if(imgOriginalName == null) return null;

        return ApplicationProperties.HOST_IMAGE_URL + "routine/" + imgOriginalName;
    }
}
