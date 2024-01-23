package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DinosaurBook {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Member member;

    @OneToMany(mappedBy = "dinosaurBook")
    private List<DinosaurCollection> dinosaurCollection;

    @Builder
    public DinosaurBook(
            Member member
    ){
        this.member = member;

    }
}
