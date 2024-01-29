package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildRelation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Child child;

    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;



    @Builder
    public ChildRelation(
            Child child,
            Relation relation
    ){
        this.child = child;
        this.relation = relation;
    }
}
