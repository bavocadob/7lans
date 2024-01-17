package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
public class TimeCapsule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ChildVolunteerRelation childVolunteerRelation;

    @Enumerated(EnumType.STRING)
    private CapsuleStatusType capsuleStatusType;

    @OneToMany(mappedBy = "timeCapsule")
    private ArrayList<CapsuleImage> capsuleImageList;
}
