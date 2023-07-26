package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.SearchErrorEnum;
import com.ssafy.hellotoday.common.util.constant.SearchKeyEnum;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class SearchValidator {

    public void validKey(String key) {
        if (!key.equals(SearchKeyEnum.NICKNAME.getName()) && !key.equals(SearchKeyEnum.TAG.getName())) {

            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(SearchErrorEnum.INVALID_KEY.getCode())
                    .message(SearchErrorEnum.INVALID_KEY.getMessage())
                    .build();
        }
    }

    public void validateWord(String word) {
        if (word == null || word.length() < 1) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(SearchErrorEnum.INVALID_WORD.getCode())
                    .message(SearchErrorEnum.INVALID_WORD.getMessage())
                    .build();
        }
    }

}
