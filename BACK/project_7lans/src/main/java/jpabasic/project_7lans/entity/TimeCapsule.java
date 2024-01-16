package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
public class TimeCapsule {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private ChildVolunteerRelation childVolunteerRelation;

    private CapsuleStatusType capsuleStatusType;

    @OneToMany(mappedBy = "timeCapsule")
    private ArrayList<CapsuleImage> capsuleImageList;
}
