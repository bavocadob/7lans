package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "memberType")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public void changePassword(String password){
        this.password = password;
    }

    public void changePhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public void changeProfileImage(String profileImgPath){
        this.profileImgPath = profileImgPath;
    }

    public Member(
            String email,
            String socialId,
            String password,
            String phoneNumber,
            String profileImgPath,
            SocialType socialType,
            LocalDate birth
    ){
        this.email = email;
        this.socialId = socialId;
        this.password = password;
        this. phoneNumber = phoneNumber;
        this.profileImgPath = profileImgPath;
        this.socialType = socialType;
        this.birth = birth;
        this.enterDate = LocalDateTime.now();
    }

}
