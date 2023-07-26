package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.FollowErrorEnum;
import com.ssafy.hellotoday.db.entity.Follow;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.FollowRepository;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class FollowValidator {

    public void checkFollowNotExist(FollowRepository followRepository, Member follower, Member following) {
        Optional<Follow> follow = followRepository.findByFollowerAndFollowing(follower, following);
        if (follow.isPresent()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(FollowErrorEnum.EXIST_FOLLOW_STATUS.getCode())
                    .message(FollowErrorEnum.EXIST_FOLLOW_STATUS.getMessage())
                    .build();
        }
    }

    public Follow checkFollowExist(FollowRepository followRepository, Member follower, Member following) {
        Optional<Follow> follow = followRepository.findByFollowerAndFollowing(follower, following);
        if (follow.isEmpty()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(FollowErrorEnum.NOT_EXIST_FOLLOW_STATUS.getCode())
                    .message(FollowErrorEnum.NOT_EXIST_FOLLOW_STATUS.getMessage())
                    .build();
        }

        return follow.get();
    }
}
