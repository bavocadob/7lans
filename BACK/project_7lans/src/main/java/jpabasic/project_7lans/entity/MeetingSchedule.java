package jpabasic.project_7lans.entity;

import jakarta.persistence.*;

import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingSchedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;

    private LocalDateTime ScheduledStartTime;

    private LocalDateTime ScheduledEndTime;

    @Enumerated(EnumType.STRING)
    private ScheduleType status = ScheduleType.SCHEDULED;

    private String thumbnailImgPath = "defaultThumbnailImgPath";

    private String meetingUrl = "meetingUrl";

    @OneToMany(mappedBy = "imgPath", cascade = CascadeType.ALL)
    private ArrayList<MeetingImage> meetingImageList = new ArrayList<>();

    @OneToOne
    private ActivityLog activityLog;


    // =========================================================================================
    // 메서드

    private void setStartTime(LocalDateTime time){
        this.ScheduledEndTime = time;
    }

    private void setEndTime(LocalDateTime time){
        this.ScheduledEndTime = time;
    }

    private void setStatus(ScheduleType status){this.status = status;}

    public void changeThumbnail(String thumbnail){
        this.thumbnailImgPath = thumbnail;
    }

    public void addMeetingImage(MeetingImage meetingImage) {
        this.meetingImageList.add(meetingImage);
        meetingImage.setMeetingSchedule(this);
    }

    // =========================================================================================
    // 생성자

    @Builder
    public static MeetingSchedule create(
            LocalDateTime startTime,
            LocalDateTime endTime,
            ActivityLog activityLog
    ){
        return MeetingSchedule.builder()
                .startTime(startTime)
                .endTime(endTime)
                .activityLog(activityLog)
                .build();
    }
}
