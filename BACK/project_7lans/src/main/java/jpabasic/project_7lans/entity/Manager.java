package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@DiscriminatorValue("MANAGER")
@PrimaryKeyJoinColumn(name="MANAGER_ID")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Manager extends Member{

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull(message = "[Manager] childCenter 은 Null 일 수 없습니다.")
    private ChildCenter childCenter;

    private Boolean approvedStatus;

    public void changeChildCenter(ChildCenter childCenter) {
        this.childCenter = childCenter;
    }

    public void changeApprovedStatus(boolean approvedStatus) {
        this.approvedStatus = approvedStatus;
    }

    @Builder
    public Manager(
            String email,
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            ChildCenter childCenter,
            MemberType memberType
    ){
        super(
                email,
                name,
                password,
                phoneNumber,
                birth,
           //     null,
                memberType
        );
        this.childCenter = childCenter;
        this.approvedStatus = false;
    }
}
