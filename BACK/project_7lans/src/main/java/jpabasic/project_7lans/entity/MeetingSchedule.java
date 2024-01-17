package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class MeetingSchedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ChildVolunteerRelation childVolunteerRelation;

    private LocalDateTime ScheduledStartTime;

    private LocalDateTime ScheduledEndTime;

    @Enumerated(EnumType.STRING)
    private ScheduleType status;


}
