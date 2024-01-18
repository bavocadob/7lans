package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("M")
@PrimaryKeyJoinColumn(name="MANAGER_ID")
public class Manager extends Member{

    @ManyToOne
    private ChildCenter childCenter;
}
