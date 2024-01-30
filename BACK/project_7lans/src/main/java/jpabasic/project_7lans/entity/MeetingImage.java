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

    private String serverFileName;

    private String originFileName;

    private String contentType;

    private long fileSize;

    @Builder
    public MeetingImage(
            String imgPath,
            String serverFileName,
            String originFileName,
            String contentType,
            long fileSize
    ){
        this.imgPath = imgPath;
        this.serverFileName = serverFileName;
        this.originFileName = originFileName;
        this.contentType = contentType;
        this.fileSize = fileSize;
    }
}
