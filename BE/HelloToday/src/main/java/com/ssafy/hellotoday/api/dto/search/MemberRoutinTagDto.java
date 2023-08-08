package com.ssafy.hellotoday.api.dto.search;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@AllArgsConstructor
@Getter
public class MemberRoutinTagDto {
    private int memberId;
    private int tagId;
    private String content;
}
