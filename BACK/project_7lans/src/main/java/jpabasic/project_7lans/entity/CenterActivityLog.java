package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import jpabasic.project_7lans.dto.child.ChildRequestDto;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CenterActivityLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private ChildCenter childCenter;

    @ManyToOne(fetch = FetchType.LAZY)
    private ActivityLog activityLog;
    @Builder
    public static CenterActivityLog createCenterActivityLog (ActivityLog activityLog){
        return CenterActivityLog.builder()
                .activityLog(activityLog)
                .build();
    }

}
