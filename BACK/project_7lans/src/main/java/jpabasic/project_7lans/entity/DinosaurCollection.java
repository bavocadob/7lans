package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DinosaurCollection {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Dinosaur dinosaur;

    @ManyToOne(fetch = FetchType.LAZY)
    private DinosaurBook dinosaurBook;

    @Builder
    public DinosaurCollection(
            Dinosaur dinosaur,
            DinosaurBook dinosaurBook
    ){
        this.dinosaur = dinosaur;
        this.dinosaurBook = dinosaurBook;
    }

}
