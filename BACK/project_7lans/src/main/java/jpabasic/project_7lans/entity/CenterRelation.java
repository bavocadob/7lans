package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CenterRelation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private ChildCenter childCenter;

    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;
    @Builder
    public static CenterRelation createCenterRelation (Relation relation){
        return CenterRelation.builder()
                .relation(relation)
                .build();
    }

}
