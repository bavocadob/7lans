package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ActivityLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private MeetingSchedule meetingSchedule;

    private LocalDateTime realStartTime;
    private LocalDateTime realEndTime;

    private String content;
    private boolean approveStatus;


}
