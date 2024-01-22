package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(uniqueConstraints = {
        @UniqueConstraint(
                name = "VOLUNTEER_CHILD_UNIQUE",
                columnNames = {"VOLUNTEER_ID", "CHILD_ID"}
        )
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildVolunteerRelation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VOLUNTEER_ID", referencedColumnName = "ID")
    private Member volunteer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_ID", referencedColumnName = "ID")
    private Member child;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChildCenter childCenter;

    @Builder
    public ChildVolunteerRelation(
            Volunteer volunteer,
            Child child,
            ChildCenter childCenter
    ){
        this.volunteer = volunteer;
        this.child = child;
        this.childCenter = childCenter;
    }
}
