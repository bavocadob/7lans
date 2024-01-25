package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private MeetingSchedule meetingSchedule;

    private String imgPath;

    @Builder
    public MeetingImage(
            String imgPath
    ){
        this.imgPath = imgPath;
    }
}
