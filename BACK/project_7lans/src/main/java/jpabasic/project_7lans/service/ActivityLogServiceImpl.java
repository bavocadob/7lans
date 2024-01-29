package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.activityLog.ActivityLogRequestDto;
import jpabasic.project_7lans.dto.activityLog.ActivityLogResponseDto;

import jpabasic.project_7lans.entity.*;
import jpabasic.project_7lans.repository.ActivityLogRepository;
import jpabasic.project_7lans.repository.RelationRepository;
import jpabasic.project_7lans.repository.VolunteerRepository;
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

    private final ActivityLogRepository activityLogRepository;
    private final VolunteerRepository volunteerRepository;

    // ==================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: volunteerId, RelationId, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @Override
    public List<ActivityLogResponseDto.detailListByVolunteer> detailListByVolunteer(ActivityLogRequestDto.detailListByVolunteer listDto){
        Volunteer volunteer = volunteerRepository.findById(listDto.getVolunteerId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.detailListByVolunteer] no such volunteer"));

        List<VolunteerRelation> volunteerRelationList = volunteer.getVolunteerRelations();

        List<ActivityLogResponseDto.detailListByVolunteer> detailList = new ArrayList<>();
        for(VolunteerRelation volunteerRelation: volunteerRelationList){
            if(volunteerRelation.getRelation().getId() == listDto.getRelationId()){
                Relation relation = volunteerRelation.getRelation();

                List<MeetingSchedule> meetingScheduleList = relation.getMeetingScheduleList();
                for(MeetingSchedule meetingSchedule: meetingScheduleList){

                    int activityYear = meetingSchedule.getScheduledEndTime().getYear();
                    int activityMonth = meetingSchedule.getScheduledEndTime().getMonthValue();

                    int dtoYear = listDto.getDateInfo().getYear();
                    int dtoMonth = listDto.getDateInfo().getMonthValue();

                    if(activityYear==dtoYear && activityMonth==dtoMonth){
                        ActivityLogResponseDto.detailListByVolunteer dto = ActivityLogResponseDto.detailListByVolunteer.builder()
                                .activityLogId(meetingSchedule.getActivityLog().getId())
                                .dateInfo(meetingSchedule.getScheduledStartTime().toLocalDate())
                                .approveStatus(meetingSchedule.getActivityLog().getApproveStatus())
                                .build();

                        detailList.add(dto);
                    }
                }
                break;
            }
        }

        return detailList;
    }

    // 봉사자 활동 일지 상세 조회
    // Req: VolunteerId relationId, activityLogId
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Override
    public ActivityLogResponseDto.detailByVolunteer detailByVolunteer(ActivityLogRequestDto.detailByVolunteer detailDto){
        Volunteer volunteer = volunteerRepository.findById(detailDto.getVolunteerId())
                .orElseThrow(()->new IllegalArgumentException("[ActivityLogServiceImpl.detailListByVolunteer] no such volunteer"));

        List<VolunteerRelation> volunteerRelationList = volunteer.getVolunteerRelations();

        ActivityLogResponseDto.detailByVolunteer detailReturnDto = null;

        for(VolunteerRelation volunteerRelation: volunteerRelationList){
            if(volunteerRelation.getRelation().getId() == detailDto.getRelationId()){
                Relation relation = volunteerRelation.getRelation();

                List<MeetingSchedule> meetingScheduleList = relation.getMeetingScheduleList();
                for(MeetingSchedule meetingSchedule: meetingScheduleList){
                    if(meetingSchedule.getActivityLog().getId() == detailDto.getActivityLogId())
                        // 센터 정보 아직 안넣었음 ERD 구조 변경 가능성...?
                        detailReturnDto = ActivityLogResponseDto.detailByVolunteer.builder()
                                .activityLogId(meetingSchedule.getActivityLog().getId())
                                .dateInfo(meetingSchedule.getActivityLog().getRealStartTime().toLocalDate())
                                .activityTime(ChronoUnit.HOURS.between(meetingSchedule.getActivityLog().getRealStartTime(), meetingSchedule.getActivityLog().getRealEndTime()))
                                .volunteerName(volunteer.getName())
                                .content(meetingSchedule.getActivityLog().getContent())
                                .writeDoneStatus(meetingSchedule.getActivityLog().getWriteStatus())
                                .approveStatus(meetingSchedule.getActivityLog().getApproveStatus())
                                .build();
                }
            }
        }

        return detailReturnDto;
    }

    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Override
    public void modifyActivityLogByVolunteer(ActivityLogRequestDto.modifyByVolunteer modifyReqDto){

    }

    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Override
    public void writeDoneActivityLogByVolunteer(ActivityLogRequestDto.writeDoneByVolunteer writeDoneReqDto){

    }


    // ==================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Override
    public List<ActivityLogResponseDto.listDisapprovedByManager> listDisapprovedByManager (ActivityLogRequestDto.listDisapprovedByManager disApprovedDto){
        return null;
    }

    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Override
    public List<ActivityLogResponseDto.listApprovedByManager> listApprovedByManager (ActivityLogRequestDto.listApprovedByManager approveDto){
        return null;
    }

    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Override
    public List<ActivityLogResponseDto.detailByManager> detailByManager (ActivityLogRequestDto.detailByManager detailDto){
        return null;
    }

}
