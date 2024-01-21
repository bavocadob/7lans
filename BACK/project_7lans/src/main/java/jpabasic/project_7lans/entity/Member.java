package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "[Member] email 은 Null 일 수 없습니다.")
    private String email;

    @NotNull(message = "[Member] name 은 Null 일 수 없습니다.")
    private String name;

    @NotNull(message = "[Member] password 은 Null 일 수 없습니다.")
    private String password;

    @NotNull(message = "[Member] phoneNumber 은 Null 일 수 없습니다.")
    private String phoneNumber;

    private String profileImgPath;

    @NotNull(message = "[Member] birth 은 Null 일 수 없습니다.")
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
            String name,
            String password,
            String phoneNumber,
            LocalDate birth
    ){
        this.email = email;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.profileImgPath = "please insert default Image Path.";
        this.birth = birth;
        this.enterDate = LocalDateTime.now();
    }

}
