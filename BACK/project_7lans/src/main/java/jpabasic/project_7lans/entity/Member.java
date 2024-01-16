package jpabasic.project_7lans.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Member {

    @Id @GeneratedValue
    private Long id;


    private String email;

    private MemberType memberType;

    private SocialType socialType;

    private String socialId;

    private LocalDateTime enterDate;

    private Long centerId;


}
