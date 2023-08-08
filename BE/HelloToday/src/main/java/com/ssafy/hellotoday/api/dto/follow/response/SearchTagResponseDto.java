package com.ssafy.hellotoday.api.dto.follow.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SearchTagResponseDto {
    private int tagId;
    private String content;
}
