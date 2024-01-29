package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CenterRelation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChildCenter childCenter;

    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;

    @Builder
    public CenterRelation(
            ChildCenter childCenter,
            Relation relation
    ){
        this.childCenter = childCenter;
        this.relation = relation;
    }

    public void setChildCenter(ChildCenter childCenter) {
        this.childCenter = childCenter;
    }
}
