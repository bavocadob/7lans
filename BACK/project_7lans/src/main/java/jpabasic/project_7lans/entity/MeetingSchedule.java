package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingSchedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;

    private LocalDateTime ScheduledStartTime;

    private LocalDateTime ScheduledEndTime;

    @Enumerated(EnumType.STRING)
    private ScheduleType status;

    private String thumbnailImgPath;

    private String meetingUrl;

    @OneToMany(mappedBy = "imgPath", cascade = CascadeType.ALL)
    private ArrayList<MeetingImage> meetingImageList = new ArrayList<>();

    @OneToOne
    private ActivityLog activityLog;

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
        this.thumbnailImgPath = thumnail;
    }

    public static MeetingSchedule create(Relation relation, LocalDateTime startTime, LocalDateTime endTime) {
        MeetingSchedule newMeeting = new MeetingSchedule();
        newMeeting.setStartTime(startTime);
        newMeeting.setEndtime(endTime);
        newMeeting.setStatus(ScheduleType.SCHEDULED);

        return newMeeting;
    }
    @Builder
    public MeetingSchedule(
            Relation relation,
            LocalDateTime ScheduledStartTime,
            LocalDateTime ScheduledEndTime,
            String thumbnailImgPath,
            ActivityLog activityLog
    ){
        this.relation = relation;
        this.ScheduledStartTime = ScheduledStartTime;
        this.ScheduledEndTime = ScheduledEndTime;
        this.status = ScheduleType.CLOSED; // 미팅 스케줄 잡힌 직후는 닫힌 상태이다.
        this.thumbnailImgPath = thumbnailImgPath;
        this.activityLog = activityLog;
        this.meetingUrl = null;
    }
}
