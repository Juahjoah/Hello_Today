package com.ssafy.hellotoday.api.service;

import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hellotoday.db.entity.routine.Routine;
import com.ssafy.hellotoday.db.repository.routine.RoutineRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.hellotoday.db.entity.routine.QRoutine.routine;

@Service
@RequiredArgsConstructor
public class SchedulerService {
    private final JPAQueryFactory queryFactory;

    // 매일 오전 0시 0분마다 실행
//    @Scheduled(cron = "0 0 0 * * *")
    @Scheduled(cron = "* * * * * *")
    public void run() {
        LocalDate now = LocalDate.now();

        // 루틴들의 flag가 false인 것들을 모두 찾고,
        // 그 루틴에 대해 endDate + 1이 now()와 같을 때,
        // update를 한다.
        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , routine.endDate
                , ConstantImpl.create("%Y-%m-%d")
        );

        LocalDateTime localDateTime = LocalDateTime.now();
        System.out.println(LocalDate.from(localDateTime));
        queryFactory.selectFrom(routine)
                .where(routine.activeFlag.eq((byte) 1).and(routine.endDate)

    }
}
