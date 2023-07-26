package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.FollowErrorEnum;
import com.ssafy.hellotoday.common.exception.message.MemberErrorEnum;
import com.ssafy.hellotoday.db.entity.Member;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class MemberValidator {

    public void checkMember(Optional<Member> member) {
        if (member.isEmpty()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(MemberErrorEnum.INVALID_MEMBER.getCode())
                    .message(MemberErrorEnum.INVALID_MEMBER.getMessage())
                    .build();
        }
    }

    public void checkMembers(int followerId, int followingId) {
        if (followerId == followingId) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(FollowErrorEnum.SAME_MEMBERS.getCode())
                    .message(FollowErrorEnum.SAME_MEMBERS.getMessage())
                    .build();
        }
    }
}
