package com.ssafy.hellotoday.common.util.constant;

import lombok.Getter;

@Getter
public enum MypageEnum {
    SUCCESS_WRITE_CHEER_MESSAGE("응원 메시지 작성을 성공했습니다.")
  , SUCCESS_MODIFY_CHEER_MESSAGE("응원 메시지 수정을 성공했습니다.")
  , SUCCESS_DELETE_CHEER_MESSAGE("응원 메시지 삭제를 성공했습니다.")
  , SUCCESS_WRITE_DDAY_MESSAGE("디데이 작성을 성공했습니다.")
  , SUCCESS_MODIFY_DDAY_MESSAGE("디데이 수정을 성공했습니다.")
  , SUCCESS_DELETE_DDAY_MESSAGE("디데이 삭제를 성공했습니다.")
    ;

    private final String name;

    MypageEnum(String name) {
        this.name = name;
    }
}
