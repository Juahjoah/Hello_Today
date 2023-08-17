package com.ssafy.hellotoday.db.repository.jdbc;

import com.ssafy.hellotoday.api.dto.routine.RoutineDetailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class RoutineJDBCRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public int insertRoutine(int memberId, LocalDateTime localDateTime, byte activeFlag) {
        String sql = "insert into routine(member_id, start_date, end_date, active_flag)" +
                "values (?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, memberId);
            ps.setObject(2, localDateTime);
            ps.setObject(3, localDateTime.plusDays(6));
            ps.setByte(4, activeFlag);
            return ps;
        }, keyHolder);

        return keyHolder.getKey().intValue();
    }

    @Transactional
    public List<Integer> insertRoutineDetailCats(int routineId, List<RoutineDetailDto> routineDetailDtoList) {
        String sql = "insert into routine_detail_cat(routine_id, routine_detail_id) values (?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.batchUpdate(sql,
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setInt(1, routineId);
                        ps.setInt(2, routineDetailDtoList.get(i).getRoutineDetailId());
                    }

                    @Override
                    public int getBatchSize() {
                        return routineDetailDtoList.size();
                    }
                });

        List<Integer> routineDetailCatIds = new ArrayList<>();
        List<Map<String, Object>> keyList = keyHolder.getKeyList();
        for (Map<String, Object> keyMap : keyList) {
            routineDetailCatIds.add((Integer) keyMap.get("routine_detail_cat_id"));
        }

        return routineDetailCatIds;
    }

    @Transactional
    public void insertRoutineChecks(List<Integer> routineDetailCatIds, LocalDateTime localDateTime) {
        String sql = "insert into routine_check(routine_detail_cat_id, created_date, modified_date, check_day_seq) " +
                "values (?, ?, ?, ?)";

        for (int routineDetailCatId : routineDetailCatIds) {
            int[] seq = {1, 2, 3, 4, 5, 6, 7};
            jdbcTemplate.batchUpdate(sql,
                    new BatchPreparedStatementSetter() {
                        @Override
                        public void setValues(PreparedStatement ps, int i) throws SQLException {
                            ps.setInt(1, routineDetailCatId);
                            ps.setObject(2, localDateTime);
                            ps.setObject(3, localDateTime);
                            ps.setInt(4, seq[i]);
                        }

                        @Override
                        public int getBatchSize() {
                            return 7;
                        }
                    });
        }
    }
}
