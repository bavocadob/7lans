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
    private ChildVolunteerRelation childVolunteerRelation;

    private LocalDateTime ScheduledStartTime;

    private LocalDateTime ScheduledEndTime;

    @Enumerated(EnumType.STRING)
    private ScheduleType status;

    private String thumbnailImgPath;

    @OneToMany(mappedBy = "imgPath")
    private ArrayList<MeetingImage> meetingImageList;

    @Builder
    public MeetingSchedule(
            ChildVolunteerRelation childVolunteerRelation,
            LocalDateTime ScheduledStartTime,
            LocalDateTime ScheduledEndTime,
            String thumbnailImgPath,
            ArrayList<MeetingImage> meetingImageList
    ){
        this.childVolunteerRelation = childVolunteerRelation;
        this.ScheduledStartTime = ScheduledStartTime;
        this.ScheduledEndTime = ScheduledEndTime;
        this.status = ScheduleType.CLOSED; // 미팅 스케줄 잡힌 직후는 닫힌 상태이다.
        this.thumbnailImgPath = thumbnailImgPath;
        this.meetingImageList = meetingImageList;
    }
}
