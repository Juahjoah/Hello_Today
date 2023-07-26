package com.ssafy.hellotoday.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    private String email;

    private String nickname;

    private String role;

    private String stMsg;

    private LocalDateTime withdrawalDate;

    private byte withdrawalFlag;

    private String profileOriginalName;

    private String profilePath;

    public Member(Integer memberId) {
        super();
    }
}
