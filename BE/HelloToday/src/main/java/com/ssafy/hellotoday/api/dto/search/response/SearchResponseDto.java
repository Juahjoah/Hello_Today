package com.ssafy.hellotoday.api.dto.search.response;

import com.ssafy.hellotoday.api.dto.follow.response.SearchTagResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class SearchResponseDto {
    private int memberId;
    private String nickname;
    private String profile;
    private List<SearchTagResponseDto> tagList;
}
