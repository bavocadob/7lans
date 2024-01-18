package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(
                name = "VOLUNTEER_CHILD_UNIQUE",
                columnNames = {"VOLUNTEER_ID", "CHILD_ID"}
        )
})
@RequiredArgsConstructor
@Getter
@Setter
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
}
