package com.ssafy.hellotoday.api.service;

import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.repository.routine.RoutineCheckRepository;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;

@Service
@RequiredArgsConstructor
@Transactional
public class SchedulerService {
    private final JPAQueryFactory queryFactory;
    private final RoutineRepository routineRepository;

    // 매일 오전 0시 0분마다 실행
    @Scheduled(cron = "0 0 0 * * *")
    public void run() {
        LocalDate now = LocalDate.now();

        // 루틴들의 flag가 false인 것들을 모두 찾고,
        // 그 루틴에 대해 endDate + 1이 now()와 같을 때,
        // update를 한다.
        List<Routine> activeRoutineList = routineRepository.findByEndDateBeforeAndActiveFlag(now.atStartOfDay(), (byte) 1);

        for(Routine routine : activeRoutineList) {
            routine.update(0);
        }
    }
}
