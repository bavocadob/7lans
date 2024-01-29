package jpabasic.project_7lans.controller;


import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.dto.activityLog.ActivityLogResponseDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class ActivityLogController {
    // ==================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: Relation id, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    public ResponseEntity<List<ActivityLogResponseDto.detailListByVolunteer>> detailListByVolunteer() {
        return null;
    }

    // 봉사자 활동 일지 상세 조회
    // Req: Relation id, activityLog id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    public ResponseEntity<ActivityLogResponseDto.detailByVolunteer> detailByVolunteer() {
        return null;
    }



    // ==================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    public ResponseEntity<List<ActivityLogResponseDto.listDisapprovedByManager>> listDisapprovedByManager () {
        return null;
    }

    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    public ResponseEntity<List<ActivityLogResponseDto.listApprovedByManager>> listApprovedByManager () {
        return null;
    }

    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    public ResponseEntity<List<ActivityLogResponseDto.detailByManager>> detailByManager () {
        return null;
    }
}
