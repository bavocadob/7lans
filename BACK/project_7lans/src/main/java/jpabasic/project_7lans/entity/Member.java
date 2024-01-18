package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "memberType")
@RequiredArgsConstructor
@Getter
@Setter
public abstract class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String socialId;

    private String password;

    private String phoneNumber;

    private String profileImgPath;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    private LocalDate birth;

    private LocalDateTime enterDate;


}
