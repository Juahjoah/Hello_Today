package com.ssafy.hellotoday.db.entity.routine;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@Getter
public class RoutineBigCat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineBigCatId;
    private String name;
}
