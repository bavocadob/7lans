package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Getter
public class MeetingSchedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChildVolunteerRelation childVolunteerRelation;

    private LocalDateTime ScheduledStartTime;

    private LocalDateTime ScheduledEndTime;

    @Enumerated(EnumType.STRING)
    private ScheduleType status;

    private String thumnailImgPath;

    @OneToMany(mappedBy = "imgPath")
    private ArrayList<MeetingImage> meetingImageList;

    private void setStartTime(LocalDateTime time){
        this.ScheduledEndTime = time;
    }

    private void setEndtime(LocalDateTime time){
        this.ScheduledEndTime = time;
    }

    private void setStatus(ScheduleType status){
        this.status = status;
    }

    public void changeThumnail(String thumnail){
        this.thumnailImgPath = thumnail;
    }

    public static MeetingSchedule create(ChildVolunteerRelation relation, LocalDateTime startTime, LocalDateTime endTime){
        MeetingSchedule newMeeting = new MeetingSchedule();
        newMeeting.setStartTime(startTime);
        newMeeting.setEndtime(endTime);
        newMeeting.setStatus(ScheduleType.SCHEDULED);

        return newMeeting;
    }
}
