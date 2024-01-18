package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ActivityLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private MeetingSchedule meetingSchedule;

    private LocalDateTime realStartTime;
    private LocalDateTime realEndTime;

    private String content;
    private boolean approveStatus;

    public void changeMeetingSchedule(MeetingSchedule meetingSchedule){
        this.meetingSchedule = meetingSchedule;
    }

    public void changeRealStartTime(LocalDateTime realStartTime){
        this.realStartTime = realStartTime;
    }

    public void changeRealEndTime(LocalDateTime realEndTime){
        this.realEndTime = realEndTime;
    }

    public void changeContent(String content){
        this.content = content;
    }

    public void approve(){
        this.approveStatus = true;
    }

    public void disApprove(){
        this.approveStatus = false;
    }

    @Builder
    public ActivityLog(MeetingSchedule meetingSchedule, LocalDateTime realStartTime, LocalDateTime realEndTime, String content){
        this.meetingSchedule = meetingSchedule;
        this.realStartTime = realStartTime;
        this.realEndTime = realEndTime;
        this.content = content;
        this.approveStatus = false; // 작성 후의 기본적인 상태는 미승인(false)
    }
}
