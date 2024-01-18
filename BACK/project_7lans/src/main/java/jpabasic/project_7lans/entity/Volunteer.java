package jpabasic.project_7lans.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@DiscriminatorValue("V")
@PrimaryKeyJoinColumn(name="VOLUNTEER_ID")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Volunteer extends Member{

    @Builder
    public Volunteer(
            String email,
            String socialId,
            String password,
            String phoneNumber,
            String profileImgPath,
            SocialType socialType,
            LocalDate birth
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
    }

}
