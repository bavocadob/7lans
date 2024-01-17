package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

@Entity
@IdClass(ChildVolunteerPK.class)
public class ChildVolunteerRelation {
    @Id @GeneratedValue
    private Long id;


    @ManyToOne
    private ChildCenter center;
}
