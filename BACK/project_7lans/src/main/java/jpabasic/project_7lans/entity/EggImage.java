package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

@Entity
public class EggImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Egg egg;


    private String imgPath;
}
