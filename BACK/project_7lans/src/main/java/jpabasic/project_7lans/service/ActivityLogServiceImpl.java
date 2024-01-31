package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.activityLog.ActivityLogRequestDto;
import jpabasic.project_7lans.dto.activityLog.ActivityLogResponseDto;

import jpabasic.project_7lans.entity.*;
import jpabasic.project_7lans.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ActivityLogServiceImpl implements ActivityLogService {

    private final RelationRepository relationRepository;
    private final ChildCenterRepository childCenterRepository;
    private final VolunteerRepository volunteerRepository;
    private final ActivityLogRepository activityLogRepository;
    private final MeetingScheduleRepository meetingScheduleRepository;

    // ==================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: RelationId, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @Override
    public List<ActivityLogResponseDto.detailListByVolunteer> detailListByVolunteer(ActivityLogRequestDto.detailListByVolunteer listDto){
        Relation relation = relationRepository.findById(listDto.getRelationId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.detailListByVolunteer] no such relation"));

        List<MeetingSchedule> meetingScheduleList = relation.getMeetingScheduleList();

        List<ActivityLogResponseDto.detailListByVolunteer> detailList = new ArrayList<>();
        for(MeetingSchedule meetingSchedule : meetingScheduleList) {
            int activityYear = meetingSchedule.getScheduledEndTime().getYear();
            int activityMonth = meetingSchedule.getScheduledEndTime().getMonthValue();

            int dtoYear = listDto.getDateInfo().getYear();
            int dtoMonth = listDto.getDateInfo().getMonthValue();

            if (activityYear == dtoYear && activityMonth == dtoMonth) {
                ActivityLogResponseDto.detailListByVolunteer dto = ActivityLogResponseDto.detailListByVolunteer.builder()
                        .activityLogId(meetingSchedule.getActivityLog().getId())
                        .dateInfo(meetingSchedule.getScheduledStartTime().toLocalDate())
                        .approveStatus(meetingSchedule.getActivityLog().getApproveStatus())
                        .build();

                detailList.add(dto);
            }
        }

        return detailList;
    }

    // 봉사자 활동 일지 상세 조회
    // Req: relationId, activityLogId
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Override
    public ActivityLogResponseDto.detailByVolunteer detailByVolunteer(ActivityLogRequestDto.detailByVolunteer detailDto){
        Relation relation = relationRepository.findById(detailDto.getRelationId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.detailByVolunteer] no such relation"));

        ActivityLog activityLog = activityLogRepository.findById(detailDto.getActivityLogId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.detailByVolunteer]no such activityLog"));

        return ActivityLogResponseDto.detailByVolunteer.builder()
                .activityLogId(activityLog.getId())
                .dateInfo(activityLog.getRealStartTime().toLocalDate())
                .activityTime(ChronoUnit.HOURS.between(activityLog.getRealStartTime(), activityLog.getRealEndTime()))
                .centerName(relation.getChildCenter().getName())
                .volunteerName(relation.getVolunteer().getName())
                .content(activityLog.getContent())
                .writeDoneStatus(activityLog.getWriteStatus())
                .approveStatus(activityLog.getApproveStatus())
                .build();
    }

    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Override
    @Transactional
    public void modifyActivityLogByVolunteer(ActivityLogRequestDto.modifyByVolunteer modifyReqDto){
        Relation relation = relationRepository.findById(modifyReqDto.getRelationId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.modifyActivityLogByVolunteer] no such relation"));

        List<MeetingSchedule> meetingScheduleList = relation.getMeetingScheduleList();

        for(MeetingSchedule meetingSchedule : meetingScheduleList) {
            if(meetingSchedule.getActivityLog().getId() == modifyReqDto.getActivityLogId()){
                ActivityLog activityLog = meetingSchedule.getActivityLog();
                // 작성 완료가 안되었거나, 승인이 안되었을 때만 수정 가능
                if(!(activityLog.getWriteStatus() || activityLog.getApproveStatus())){
                    activityLog.changeContent(modifyReqDto.getContent());
                }
                break;
            }
        }
    }

    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: activityLog id, content
    // Res: 없음
    @Override
    @Transactional
    public void writeDoneActivityLogByVolunteer(ActivityLogRequestDto.writeDoneByVolunteer writeDoneReqDto){

        Volunteer volunteer = volunteerRepository.findById(writeDoneReqDto.getVolunteerId())
                .orElseThrow(()-> new IllegalArgumentException("[ActivityLogServiceImpl.writeDoneActivityLogByVolunteer] no such volunteer"));

        ActivityLog activityLog = activityLogRepository.findById(writeDoneReqDto.getActivityLogId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.writeDoneActivityLogByVolunteer] no such activityLog"));

        // 작성 완료가 안되었거나, 승인이 안되었을 때만 수정 가능
        if(!(activityLog.getWriteStatus() || activityLog.getApproveStatus())){
            activityLog.writeDone();
            activityLog.changeContent(writeDoneReqDto.getContent());
        }
    }

    // ==================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Override
    public List<ActivityLogResponseDto.listDisapprovedByManager> listDisapprovedByManager (ActivityLogRequestDto.listDisapprovedByManager disApprovedDto){
        ChildCenter childCenter = childCenterRepository.findById(disApprovedDto.getCenterId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.listDisapprovedByManager] no such childCenter"));

        List<Relation> relationList = relationRepository.findByChildCenter(childCenter);

        List<ActivityLogResponseDto.listDisapprovedByManager> activityLogList = new ArrayList<>();

        // 센터와 연관된 관계리스트에서
        int relationListLength = relationList.size();
        for(int i=0; i<relationListLength; i++){

            // 관계 하나당 미팅 스케줄 리스트를 가져오고
            List<MeetingSchedule> meetingScheduleList = relationList.get(i).getMeetingScheduleList();
            int meetingListLength = meetingScheduleList.size();

            // 미팅 스케줄 리스트에서
            for(int j=0; j<meetingListLength; j++){

                // 활동일지가 승인되어 있으면
                if((!meetingScheduleList.get(j).getActivityLog().getApproveStatus()) && meetingScheduleList.get(j).getActivityLog().getWriteStatus()){
                    ActivityLog activityLog = meetingScheduleList.get(j).getActivityLog();

                    // 리스트에 담을 DTO를 만들고
                    ActivityLogResponseDto.listDisapprovedByManager dto = ActivityLogResponseDto.listDisapprovedByManager.builder()
                            .activityId(activityLog.getId())
                            .volunteerName(relationList.get(i).getVolunteer().getName())
                            .childName(relationList.get(i).getChild().getName())
                            .dateInfo(activityLog.getRealStartTime().toLocalDate())
                            .build();

                    // DTO에 담는다.
                    activityLogList.add(dto);
                }
            }
        }
        return activityLogList;
    }

    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Override
    public List<ActivityLogResponseDto.listApprovedByManager> listApprovedByManager (ActivityLogRequestDto.listApprovedByManager approveDto){
        ChildCenter childCenter = childCenterRepository.findById(approveDto.getCenterId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.listApprovedByManager] no such childCenter"));

        List<Relation> relationList = relationRepository.findByChildCenter(childCenter);

        List<ActivityLogResponseDto.listApprovedByManager> activityLogList = new ArrayList<>();

        // 센터와 연관된 관계리스트에서
        int relationListLength = relationList.size();
        for(int i=0; i<relationListLength; i++){

            // 관계 하나당 미팅 스케줄 리스트를 가져오고
            List<MeetingSchedule> meetingScheduleList = relationList.get(i).getMeetingScheduleList();
            int meetingListLength = meetingScheduleList.size();

            // 미팅 스케줄 리스트에서
            for(int j=0; j<meetingListLength; j++){

                // 활동일지가 승인되어있지 않고, 활동 일지가 작성 완료인 경우
                if(meetingScheduleList.get(j).getActivityLog().getApproveStatus()){
                    ActivityLog activityLog = meetingScheduleList.get(j).getActivityLog();

                    // 리스트에 담을 DTO를 만들고
                    ActivityLogResponseDto.listApprovedByManager dto = ActivityLogResponseDto.listApprovedByManager.builder()
                            .activityId(activityLog.getId())
                            .volunteerName(relationList.get(i).getVolunteer().getName())
                            .childName(relationList.get(i).getChild().getName())
                            .dateInfo(activityLog.getRealStartTime().toLocalDate())
                            .build();

                    // DTO에 담는다.
                    activityLogList.add(dto);
                }
            }
        }
        return activityLogList;
    }

    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Override
    public ActivityLogResponseDto.detailByManager detailByManager (ActivityLogRequestDto.detailByManager detailDto){

        Relation relation = relationRepository.findById(detailDto.getRelationId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.detailByManager] no such relation"));

        ActivityLog activityLog = activityLogRepository.findById(detailDto.getActivityLogId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.detailByManager] no such activityLog"));

        return ActivityLogResponseDto.detailByManager.builder()
                .activityLogId(activityLog.getId())
                .dateInfo(activityLog.getRealStartTime().toLocalDate())
                .activityTime(ChronoUnit.HOURS.between(activityLog.getRealStartTime(), activityLog.getRealEndTime()))
                .centerName(relation.getChildCenter().getName())
                .volunteerName(relation.getVolunteer().getName())
                .content(activityLog.getContent())
                .writeDoneStatus(activityLog.getWriteStatus())
                .approveStatus(activityLog.getApproveStatus())
                .build();
    }

    // 관리자 활동 일지 승인
    // Req: activityLogId
    // Res: 없음
    @Override
    @Transactional
    public void approveByManager(ActivityLogRequestDto.approveByManager approveReqDto){
        ActivityLog activityLog = activityLogRepository.findById(approveReqDto.getActivityLogId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.approveByManager] no such activityLog"));

        // 작성 완료 상태이면 활동 일지를 승인상태로 바꾼다.
        if(activityLog.getWriteStatus()) activityLog.approve();
    }

    public void setStartTime(ActivityLogRequestDto.startTime startTime) {
           MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(startTime.getMeetingId())
                   .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.setStartTime] no such meetingSchedule"));

           ActivityLog activityLog = meetingSchedule.getActivityLog();

           activityLog.setRealStartTime(startTime.getStartTime());

    }

    public void setEndTime(ActivityLogRequestDto.endTime endTime) {
        MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(endTime.getMeetingId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.setEndTime] no such meetingSchedule"));

        ActivityLog activityLog = meetingSchedule.getActivityLog();

        activityLog.setRealEndTime(endTime.getEndTime());
    }
}
