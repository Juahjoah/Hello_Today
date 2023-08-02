package com.ssafy.hellotoday.api.dto.member.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class MemberInfoUpdateRequestDto {

    private String nickname;
    private String stMsg;
    private MultipartFile file;

}
