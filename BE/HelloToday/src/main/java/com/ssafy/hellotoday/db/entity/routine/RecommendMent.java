package com.ssafy.hellotoday.db.entity.routine;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class RecommendMent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recommendMentId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_big_cat_id")
    private RoutineBigCat routineBigCat;
    private String content;
}
