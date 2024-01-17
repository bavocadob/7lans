package jpabasic.project_7lans.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@DiscriminatorValue("M")
@PrimaryKeyJoinColumn(name="MANAGER_ID")
public class Manager extends Member{

    @OneToOne
    private ChildCenter childCenter;
}
