package jpabasic.project_7lans.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

import java.util.List;

@Entity
@DiscriminatorValue("V")
@PrimaryKeyJoinColumn(name="VOLUNTEER_ID")
public class Volunteer extends Member{

    @OneToMany(mappedBy = "volunteer")
    private List<ChildVolunteerRelation> volunteerRelation;

}
