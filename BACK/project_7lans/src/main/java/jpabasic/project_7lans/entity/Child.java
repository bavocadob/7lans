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
@DiscriminatorValue("C")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@PrimaryKeyJoinColumn(name="CHILD_ID")
public class Child extends Member {
    @ManyToOne
    @NotNull(message = "[Child] childCenter 은 Null 일 수 없습니다.")
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
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            ChildCenter childCenter
    ){
        super(
                email,
                name,
                password,
                phoneNumber,
                birth
        );
        this.childCenter = childCenter;
        this.specialContent = "";
    }
}
