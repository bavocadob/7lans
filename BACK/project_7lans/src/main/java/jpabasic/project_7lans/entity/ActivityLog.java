package jpabasic.project_7lans.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;

@Entity
public class ActivityLog {
    @Id @GeneratedValue
    private Long id;

    @OneToOne
    private MeetingSchedule meetingSchedule;

    private LocalDateTime realStartTime;
    private LocalDateTime realEndTime;

    private String content;
    private boolean approveStatus;


}
