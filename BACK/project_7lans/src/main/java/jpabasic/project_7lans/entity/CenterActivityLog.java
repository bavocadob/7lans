package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CenterActivityLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChildCenter childCenter;

    @ManyToOne(fetch = FetchType.LAZY)
    private ActivityLog activityLog;

    @Builder
    public CenterActivityLog(
            ChildCenter childCenter,
            ActivityLog activityLog
    ){
        this.childCenter = childCenter;
        this.activityLog = activityLog;
    }
}
