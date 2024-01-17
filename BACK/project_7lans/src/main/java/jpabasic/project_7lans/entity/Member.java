package jpabasic.project_7lans.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Member {

    @Id @GeneratedValue
    private Long id;

    private Long centerId;

    private String email;

    private String socialId;

    private String password;

    private String phoneNumber;

    private String profileImgUrl;

    private MemberType memberType;

    private SocialType socialType;

    private LocalDate birth;

    private LocalDateTime enterDate;
}
