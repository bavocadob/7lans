package jpabasic.project_7lans.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingSchedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime ScheduledStartTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime ScheduledEndTime;

    @Enumerated(EnumType.STRING)
    private ScheduleType status = ScheduleType.SCHEDULED;

    private String thumbnailImgPath = "defaultThumbnailImgPath";

    private String meetingUrl = "meetingUrl";

    @OneToMany(mappedBy = "imgPath", cascade = CascadeType.PERSIST)
    private List<MeetingImage> meetingImageList = new ArrayList<>();

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
    public MeetingSchedule(
            LocalDateTime startTime,
            LocalDateTime endTime,
            ActivityLog activityLog
    ){
        this.ScheduledStartTime = startTime;
        this.ScheduledEndTime = endTime;
        this.activityLog = activityLog;
    }
}
