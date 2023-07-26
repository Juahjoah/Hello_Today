package com.ssafy.hellotoday.db.entity.routine;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
public class RoutineTag {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineTagId;
    private String content;
}
