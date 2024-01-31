package jpabasic.project_7lans.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.dto.activityLog.ActivityLogRequestDto;
import jpabasic.project_7lans.dto.activityLog.ActivityLogResponseDto;
import jpabasic.project_7lans.service.ActivityLogServiceImpl;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="활동 일지 API", description = "활동 일지 관련 API입니다.")
@RestController
@RequestMapping(value = "/activityLog")
@RequiredArgsConstructor
public class ActivityLogController {

    private final ActivityLogServiceImpl activityLogServiceImpl;

    // ==================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: relationId, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @Operation(summary = "봉사자가 활동 일지 리스트 조회")
    @PostMapping(value = "/volunteer/list")
    public ResponseEntity<List<ActivityLogResponseDto.detailListByVolunteer>> detailListByVolunteer(ActivityLogRequestDto.detailListByVolunteer listReqDto) {
        try{
            List<ActivityLogResponseDto.detailListByVolunteer> dtoResList = activityLogServiceImpl.detailListByVolunteer(listReqDto);
            return new ResponseEntity<>(dtoResList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "봉사자가 활동 일지 1개 상세 조회")
    // 봉사자 활동 일지 상세 조회
    // Req: relationId, activityLogId
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @PostMapping(value = "/volunteer")
    public ResponseEntity<ActivityLogResponseDto.detailByVolunteer> detailByVolunteer(ActivityLogRequestDto.detailByVolunteer detailReqDto) {
        try{
            ActivityLogResponseDto.detailByVolunteer detailResDto = activityLogServiceImpl.detailByVolunteer(detailReqDto);
            return new ResponseEntity<>(detailResDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Operation(summary = "봉사자가 활동 일지 수정")
    @PutMapping(value = "/volunteer/modify")
    public ResponseEntity modifyActivityLogByVolunteer(ActivityLogRequestDto.modifyByVolunteer modifyReqDto){
        try{
            activityLogServiceImpl.modifyActivityLogByVolunteer(modifyReqDto);
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "봉사자가 활동 일지 작성 완료")
    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @PutMapping(value = "/volunteer/writeDone")
    public ResponseEntity writeDoneActivityLogByVolunteer(ActivityLogRequestDto.writeDoneByVolunteer writeDoneReqDto){
        try{
            activityLogServiceImpl.writeDoneActivityLogByVolunteer(writeDoneReqDto);
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // ==================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Operation(summary = "관리자가 승인되지 않은 활동 리스트 조회")
    @GetMapping(value = "/manager/disapprovedList/{centerId}")
    public ResponseEntity<List<ActivityLogResponseDto.listDisapprovedByManager>> listDisapprovedByManager (@PathVariable Long centerId) {
        ActivityLogRequestDto.listDisapprovedByManager reqDto = ActivityLogRequestDto.listDisapprovedByManager.builder()
                .centerId(centerId)
                .build();
        try{
            List<ActivityLogResponseDto.listDisapprovedByManager> resList = activityLogServiceImpl.listDisapprovedByManager(reqDto);
            return new ResponseEntity<>(resList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Operation(summary = "관리자가 승인된 활동 리스트 조회")
    @GetMapping(value = "/manager/approvedList/{centerId}")
    public ResponseEntity<List<ActivityLogResponseDto.listApprovedByManager>> listApprovedByManager (@PathVariable Long centerId) {
        ActivityLogRequestDto.listApprovedByManager reqDto = ActivityLogRequestDto.listApprovedByManager.builder()
                .centerId(centerId)
                .build();

        try {
            List<ActivityLogResponseDto.listApprovedByManager> resList = activityLogServiceImpl.listApprovedByManager(reqDto);
            return new ResponseEntity<List<ActivityLogResponseDto.listApprovedByManager>>(resList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Operation(summary = "관리자 활동 일지 상세 조회")
    @PostMapping(value = "/manager/detail")
    public ResponseEntity<ActivityLogResponseDto.detailByManager> detailByManager (@PathVariable Long centerId) {
        ActivityLogRequestDto.detailByManager reqDto = ActivityLogRequestDto.detailByManager.builder()
                .centerId(centerId)
                .build();

        try {
            ActivityLogResponseDto.detailByManager resDto = activityLogServiceImpl.detailByManager(reqDto);
            return new ResponseEntity<>(resDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자가 특정 활동 일지 승인
    @Operation(summary = "관리자가 특정 활동 일지 승인")
    @PostMapping(value = "/manager/approve")
    public ResponseEntity approveByManager (ActivityLogRequestDto.approveByManager approveReqDto) {
        try{

            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
