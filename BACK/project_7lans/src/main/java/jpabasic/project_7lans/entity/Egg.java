package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Egg {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean volunteerCheck = false;

    private boolean childCheck = false;

    private Integer experience = 0;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Dinosaur dinosaur;

    public void addExperience(Integer exp){
        this.experience += exp;
    }

    @Builder
    public static Egg createEgg(
            Dinosaur dinosaur
    ){
        return Egg.builder()
                .dinosaur(dinosaur)
                .build();
    }
}
