package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ActivityLog;
import jpabasic.project_7lans.entity.CenterActivityLog;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.MeetingSchedule;
import jpabasic.project_7lans.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ActivityLogServiceImpl {

    ActivityLogRepository activityLogRepository;
    //일지 생성
/*    @Transactional
    public void createActivityLog(MeetingSchedule meeting, LocalDateTime startTime, LocalDateTime endTime){
        ActivityLog activityLog = ActivityLog.builder()
                .startTime(startTime)
                .endTime(endTime)
                .build();//createActivityLog(startTime, endTime);
        activityLogRepository.save(activityLog);
    }*/

    //글 쓰기, 수정
    @Transactional
    public void updateContent(Long activityId, String content){
        ActivityLog activityLog = activityLogRepository.findById(activityId).orElseThrow(() -> new IllegalArgumentException("no such data"));
        activityLog.changeContent(content);
    }

    //해당 미팅에 해당하는 일지 조회
    public ActivityLog findActivityLog(MeetingSchedule meetingSchedule){
        return activityLogRepository.findById(meetingSchedule.getId()).orElseThrow(() -> new IllegalArgumentException("no such meeting"));
    }

    //승인여부 조회
    //승인 시 true, 아직 승인 안 했을 시 false
    public boolean isApprove(Long id){
        ActivityLog findLog = activityLogRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("no such activity log"));
        return findLog.getApproveStatus();
    }

    //승인 변경
    @Transactional
    public void approve(Long id){
        ActivityLog findLog = activityLogRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("no such activity log"));
        findLog.approve();
    }

    //승인되지 않은 활동일지 조회
    public List<ActivityLog> findUnapproveLogs(ChildCenter center){
        //센터에 속한 모든 활동일지
        /*List<ActivityLog> logs = activityLogRepository.findByChildCenter(center);

        //승인되지 않은 것들만 뽑기
        logs = logs.stream()
                .filter(l -> l.isApproveStatus()==false)
                .collect(Collectors.toList());*/

        return null;//logs;

    }

}
