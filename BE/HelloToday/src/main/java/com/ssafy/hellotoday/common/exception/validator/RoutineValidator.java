package com.ssafy.hellotoday.common.exception.validator;

import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.RoutineErrorEnum;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class RoutineValidator {
    public void checkPrivateRoutineExist(RoutineRepository routineRepository, Member member) {
        Routine checkRoutine = routineRepository.findByMember_MemberIdAndActiveFlag(member.getMemberId(), (byte) 1).get();
        if(checkRoutine != null) throw CustomException.builder()
                .status(HttpStatus.BAD_REQUEST)
                .code(RoutineErrorEnum.EXIST_ROUTINE_STATUS.getCode())
                .message(RoutineErrorEnum.EXIST_ROUTINE_STATUS.getName())
                .build();
    }
}
