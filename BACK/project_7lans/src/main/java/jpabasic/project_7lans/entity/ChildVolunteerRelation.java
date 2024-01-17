package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(
                name = "VOLUNTEER_CHILD_UNIQUE",
                columnNames = {"VOLUNTEER_ID", "CHILD_ID"}
        )
})
public class ChildVolunteerRelation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "VOLUNTEER_ID", referencedColumnName = "ID")
    private Member volunteer;

    @ManyToOne
    @JoinColumn(name = "CHILD_ID", referencedColumnName = "ID")
    private Member child;

    @ManyToOne
    private ChildCenter childCenter;
}
