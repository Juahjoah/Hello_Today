package com.ssafy.hellotoday.db.entity.routine;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RoutineTag {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineTagId;
    private String content;
}
