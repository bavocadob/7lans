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

    private boolean volunteerCheck;

    private boolean childCheck;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Dinosaur dinosaur;

    @Builder
    public Egg(
            Dinosaur dinosaur
    ){
        this.volunteerCheck = false;
        this.childCheck = false;
        this.dinosaur = dinosaur;
    }
}
