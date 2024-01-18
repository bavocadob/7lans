package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
public class Egg {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChildVolunteerRelation childVolunteerRelation;

    @Enumerated(EnumType.STRING)
    private EggStatusType eggStatusType;

    @OneToMany(mappedBy = "egg")
    private ArrayList<EggImage> eggImageList;
}
