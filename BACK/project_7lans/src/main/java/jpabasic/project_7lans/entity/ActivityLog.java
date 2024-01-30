package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class ActivityLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @OneToOne(mappedBy = "activityLog", fetch = FetchType.LAZY)
    private MeetingSchedule meetingSchedule;

    private LocalDateTime realStartTime;

    private LocalDateTime realEndTime;

    private String content = null;

    private Boolean approveStatus = false;


    public void changeContent(String newContent){
        this.content = newContent;
    }

    public void changeTime(LocalDateTime realStartTime, LocalDateTime realEndTime){
        this.realStartTime = realStartTime;
        this.realEndTime = realEndTime;
    }

    public void changeMeetingSchedule(MeetingSchedule meetingSchedule){
        this.meetingSchedule = meetingSchedule;
    }

    public void approve(){
        this.approveStatus = true;
    }

    public void disApprove(){
        this.approveStatus = false;
    }

}
