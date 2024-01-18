package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EggImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Egg egg;

    private String imgPath;

    public void changeImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    @Builder
    public EggImage(
            Egg egg,
            String imgPath
    ){
        this.egg = egg;
        this.imgPath = imgPath;
    }

}
