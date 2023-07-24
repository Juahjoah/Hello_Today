package com.ssafy.hellotoday.db.repository;

import com.ssafy.hellotoday.common.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

}
