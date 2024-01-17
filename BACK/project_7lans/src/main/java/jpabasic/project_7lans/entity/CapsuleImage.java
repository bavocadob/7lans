package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

@Entity
public class CapsuleImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private TimeCapsule timeCapsule;
    private String imageUrl;
}
