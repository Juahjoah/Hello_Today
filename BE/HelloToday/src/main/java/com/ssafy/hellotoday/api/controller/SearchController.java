package com.ssafy.hellotoday.api.controller;

import com.ssafy.hellotoday.api.dto.search.response.SearchResponseDto;
import com.ssafy.hellotoday.api.dto.search.response.SearchResponsePageDto;
import com.ssafy.hellotoday.api.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@Tag(name = "Search", description = "검색 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;

    @Operation(summary = "검색", description = "닉네임, 아이디, 루틴 태그로 사용자를 검색하는 API")
    @GetMapping
    public SearchResponsePageDto searchByNickname(@RequestParam String key,
                                                  @RequestParam String word,
                                                  @PageableDefault Pageable pageable) {
        return searchService.search(key, word, pageable);
    }

}
