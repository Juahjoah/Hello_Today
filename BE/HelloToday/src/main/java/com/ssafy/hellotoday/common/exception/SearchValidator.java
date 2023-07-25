package com.ssafy.hellotoday.common.exception;

import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class SearchValidator {

    public void validKey(String key) {
        if (!key.equals(SearchKeyEnum.NICKNAME.getName()) && !key.equals(SearchKeyEnum.TAG.getName())) {
            throw new IllegalArgumentException("key에는 닉네임 또는 태그가 주어져야 합니다.");
        }
    }

}
