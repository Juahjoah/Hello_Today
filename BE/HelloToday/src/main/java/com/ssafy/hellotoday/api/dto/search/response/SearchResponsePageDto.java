package com.ssafy.hellotoday.api.dto.search.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@AllArgsConstructor
@Getter
public class SearchResponsePageDto {
    private int totalPages;
    private long totalMembers;
    private List<SearchResponseDto> members;
}
