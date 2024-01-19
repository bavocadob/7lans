package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.MeetingSchedule;
import jpabasic.project_7lans.entity.ScheduleType;
import jpabasic.project_7lans.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private final MeetingRepository meetingRepository;

    //미팅 생성
    @Transactional
    public void createMeeting(ChildVolunteerRelation relation, LocalDateTime startTime, LocalDateTime endTime){
        MeetingSchedule newMeeting = MeetingSchedule.create(relation, startTime, endTime);
        meetingRepository.save(newMeeting);
    }

    //예정 미팅 수정
/*    @Transactional
    public void updateMeeting(MeetingSchedule updateMeeting, ChildVolunteerRelation relation, LocalDateTime startTime, LocalDateTime endTime){

    }*/

    //해당 관계의 미팅 조회
    public List<MeetingSchedule> findMeetingsByRelation(ChildVolunteerRelation relation){
        return meetingRepository.findByRelation(relation);
    }

    //미팅 상태 확인(예정)
    public boolean isScheduled(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.SCHEDULED);
    }
    //미팅 상태 확인(열림)
    public boolean isOpened(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.OPENED);
    }
    //미팅 상태 확인(종료됨)
    public boolean isClosed(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.CLOSED);
    }

    //썸네일 수정
    public void changeThumnail(MeetingSchedule meetingSchedule, String thumnail){
        meetingSchedule.changeThumnail(thumnail);
    }




}
