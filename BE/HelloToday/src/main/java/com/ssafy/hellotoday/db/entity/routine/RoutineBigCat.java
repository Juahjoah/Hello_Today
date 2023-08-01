package com.ssafy.hellotoday.db.entity.routine;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class RoutineBigCat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routineBigCatId;
    @Enumerated(EnumType.STRING)
    private RoutineName name;
}
