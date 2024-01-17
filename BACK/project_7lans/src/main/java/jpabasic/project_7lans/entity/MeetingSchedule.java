package jpabasic.project_7lans.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class MeetingSchedule {
    @Id @GeneratedValue
    private Long id;

    private LocalDateTime ScheduledStartTime;

    private LocalDateTime ScheduledEndTime;

    private ScheduleType status;
}
