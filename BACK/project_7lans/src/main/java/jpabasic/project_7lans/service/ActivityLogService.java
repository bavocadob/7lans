package jpabasic.project_7lans.service;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.dto.activityLog.ActivityLogRequestDto;
import jpabasic.project_7lans.dto.activityLog.ActivityLogResponseDto;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface ActivityLogService {
    // ==================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: Relation id, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    public List<ActivityLogResponseDto.detailListByVolunteer> detailListByVolunteer(ActivityLogRequestDto.detailListByVolunteer listDto);

    // 봉사자 활동 일지 상세 조회
    // Req: Relation id, activityLog id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    public ActivityLogResponseDto.detailByVolunteer detailByVolunteer(ActivityLogRequestDto.detailByVolunteer detailDto);

    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    public void modifyActivityLogByVolunteer(ActivityLogRequestDto.modifyByVolunteer modifyReqDto);

    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    public void writeDoneActivityLogByVolunteer(ActivityLogRequestDto.writeDoneByVolunteer writeDoneReqDto);

    // ==================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    public List<ActivityLogResponseDto.listDisapprovedByManager> listDisapprovedByManager (ActivityLogRequestDto.listDisapprovedByManager disApprovedDto);

    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    public List<ActivityLogResponseDto.listApprovedByManager> listApprovedByManager (ActivityLogRequestDto.listApprovedByManager approveDto);

    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    public ActivityLogResponseDto.detailByManager detailByManager (ActivityLogRequestDto.detailByManager detailDto);
}
