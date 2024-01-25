package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(uniqueConstraints = {
        @UniqueConstraint(
                name = "VOLUNTEER_CHILD_UNIQUE",
                columnNames = {"VOLUNTEER_ID", "CHILD_ID"}
        )
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Relation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VOLUNTEER_ID", referencedColumnName = "ID")
    private Volunteer volunteer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_ID", referencedColumnName = "ID")
    private Child child;

    @OneToMany(mappedBy = "relation", cascade = CascadeType.ALL)
    private List<CenterRelation> centerRelationList = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    private Egg egg;

    @OneToMany(mappedBy = "relation", cascade = CascadeType.ALL)
    private List<MeetingSchedule> meetingScheduleList = new ArrayList<>();

    @OneToMany(mappedBy = "relation", cascade = CascadeType.ALL)
    private List<Whisper> whisperList = new ArrayList<>();

    // =================================================
    // 메소드
    public void addCenterRelation(CenterRalation centerRalation){
        centerRalationList.add(centerRalation);
        //centerRalation.setRelation(this);
    }

    public void addMeetingSchedule(MeetingSchedule meetingSchedule){
        meetingScheduleList.add(meetingSchedule);
        //meetingSchedule.setRelation(this);
    }

    public void addWhisperList(Whisper whisper){
        whisperList.add(whisper);
        //whisper.setRelation(this);
    }
    @Builder
    public Relation(
            Volunteer volunteer,
            Child child,
            Egg egg
    ){
        this.volunteer = volunteer;
        this.child = child;
        this.egg = egg;
    }
}
