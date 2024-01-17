package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class SecretDiary {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Member writer;

    @ManyToOne
    private ChildVolunteerRelation childVolunteerRelation;

    private String content;

    private LocalDateTime createDate;

    private boolean readStatus;
}
