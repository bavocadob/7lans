package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

@Entity
public class ChildVolunteerRelation {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Member volunteer;

    @ManyToOne
    private Member child;

    @ManyToOne
    private Center center;
}
