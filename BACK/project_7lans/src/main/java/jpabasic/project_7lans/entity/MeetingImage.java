package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

@Entity
public class MeetingImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private MeetingSchedule meetingSchedule;

    private String imgPath;
}
