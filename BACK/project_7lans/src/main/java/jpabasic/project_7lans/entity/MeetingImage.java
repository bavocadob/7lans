package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private MeetingSchedule meetingSchedule;

    private String imgPath;

    @Builder
    public MeetingImage(
            MeetingSchedule meetingSchedule,
            String imgPath
    ){
        this.meetingSchedule = meetingSchedule;
        this.imgPath = imgPath;
    }
}
