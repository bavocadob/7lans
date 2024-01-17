package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@DiscriminatorValue("C")
@PrimaryKeyJoinColumn(name="CHILD_ID")
public class Child extends Member {


    @OneToOne
    private ChildCenter childCenter;

    private String specialContent;

    @OneToMany(mappedBy = "child")
    private List<ChildVolunteerRelation> childRelation;
}
