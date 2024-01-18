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
@DiscriminatorValue("C")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@PrimaryKeyJoinColumn(name="CHILD_ID")
public class Child extends Member {
    @ManyToOne
    private ChildCenter childCenter;

    private String specialContent;

    public void changeChildCenter(ChildCenter childCenter){
        this.childCenter = childCenter;
    }

    public void changeSpecialContent(String specialContent){
        this.specialContent = specialContent;
    }

    @Builder
    public Child(
            String email,
            String socialId,
            String password,
            String phoneNumber,
            String profileImgPath,
            SocialType socialType,
            LocalDate birth,
            ChildCenter childCenter,
            String specialContent
    ){
        super(
                email,
                socialId,
                password,
                phoneNumber,
                profileImgPath,
                socialType,
                birth
        );
        this.childCenter = childCenter;
        this.specialContent = specialContent;
    }
}
