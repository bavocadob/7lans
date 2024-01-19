package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@DiscriminatorValue("M")
@PrimaryKeyJoinColumn(name="MANAGER_ID")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Manager extends Member{

    @ManyToOne
    private ChildCenter childCenter;

    private boolean approvedStatus;

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
        this.approvedStatus = false;
    }
}
