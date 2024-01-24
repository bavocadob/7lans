package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VolunteerRelation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Volunteer volunteer;

    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;

    @Builder
    public VolunteerRelation(
            Volunteer volunteer,
            Relation relation
    ){
        this.volunteer = volunteer;
        this.relation = relation;
    }
}
