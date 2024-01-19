package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class ActivityLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private MeetingSchedule meetingSchedule;

    private LocalDateTime realStartTime;
    private LocalDateTime realEndTime;

    private String content;
    private boolean approveStatus;

    private void setMeetingSchedule(MeetingSchedule meetingSchedule){
        this.meetingSchedule = meetingSchedule;
    }

    private void setRealStartTime(LocalDateTime startTime){
        this.realStartTime = startTime;
    }

    private void setRealEndTime(LocalDateTime endTime){
        this.realEndTime = endTime;
    }

    private void initApproveStatus(){
        this.approveStatus = false;
    }


    public static ActivityLog create(MeetingSchedule meeting, LocalDateTime startTime, LocalDateTime endTime){
        ActivityLog newLog = new ActivityLog();
        newLog.setMeetingSchedule(meeting);
        newLog.setRealStartTime(startTime);
        newLog.setRealEndTime(endTime);
        newLog.initApproveStatus();

        return newLog;
    }

    public void updateContent(String content){
        this.content = content;
    }

    public void approve(){
        this.approveStatus = true;
    }

}
