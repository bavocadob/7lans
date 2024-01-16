package jpabasic.project_7lans.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CapsuleImage {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private TimeCapsule timeCapsule;
    private String imageUrl;
}
