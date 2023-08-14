package com.ssafy.hellotoday.db.repository.widget;

import com.ssafy.hellotoday.db.entity.widget.wishdiary.Type;
import com.ssafy.hellotoday.db.entity.widget.wishdiary.WishDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WishDiaryRepository extends JpaRepository<WishDiary,Integer> {


    @Query("select w from WishDiary w join fetch w.member where w.member.memberId=:memberId and w.type=:type order by w.wishDiaryId desc ")
    List<WishDiary> findAllByMemberIdAndType(Integer memberId, Type type);
}
