package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@DiscriminatorValue("MANAGER")
@PrimaryKeyJoinColumn(name="MANAGER_ID")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Manager extends Member{

    @ManyToOne
    @NotNull(message = "[Manager] childCenter 은 Null 일 수 없습니다.")
    private ChildCenter childCenter;

    private boolean approvedStatus = false;

    public void changeChildCenter(ChildCenter childCenter) {
        this.childCenter = childCenter;
    }

    public void changeApprovedStatus(boolean approvedStatus) {
        this.approvedStatus = approvedStatus;
    }

    @Builder
    public static Manager createManager(
            String email,
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            ChildCenter childCenter
    ){
        return Manager.builder()
                .email(email)
                .name(name)
                .password(password)
                .phoneNumber(phoneNumber)
                .birth(birth)
                .childCenter(childCenter)
                .build();
    }
}
