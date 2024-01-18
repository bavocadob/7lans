package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Egg {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChildVolunteerRelation childVolunteerRelation;

    @Enumerated(EnumType.STRING)
    private EggStatusType eggStatusType;

    @OneToMany(mappedBy = "egg")
    private ArrayList<EggImage> eggImageList;

    public void changeEggStatusType(EggStatusType eggStatusType) {
        this.eggStatusType = eggStatusType;
    }

    public void addEggImage(EggImage eggImage) {
        this.eggImageList = eggImageList;
    }

    @Builder
    public Egg(
            ChildVolunteerRelation childVolunteerRelation,
            EggStatusType eggStatusType,
            ArrayList<EggImage> eggImageList
    ){
        this.childVolunteerRelation = childVolunteerRelation;
        this.eggStatusType = eggStatusType;
        this.eggImageList = eggImageList;
    }
}
