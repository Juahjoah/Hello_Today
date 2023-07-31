package com.ssafy.hellotoday.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@ToString
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    private String email;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String stMsg;

    private LocalDateTime withdrawalDate;

    private byte withdrawalFlag;

    private String profileOriginalName;

    private String profilePath;
    private String socialId;
    @Enumerated(EnumType.STRING)
    private Social socialType;

    public Member(Integer memberId) {
        super();
        this.memberId = memberId;
    }
    @Builder
    public Member(String email, String nickname, Role role, String profilePath, String socialId, Social socialType) {
        this.email = email;
        this.nickname = nickname;
        this.role = role;
        this.profilePath = profilePath;
        this.socialId = socialId;
        this.socialType = socialType;
    }

    //회원정보 수정
    public void updateMemberInfo(String nickname, String stMsg, String profileOriginalName, String profilePath) {
        this.nickname = nickname;
        this.stMsg = stMsg;
        this.profileOriginalName = profileOriginalName;
        this.profilePath = profilePath;

    }
}
