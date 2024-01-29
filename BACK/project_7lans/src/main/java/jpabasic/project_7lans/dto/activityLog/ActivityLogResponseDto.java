package jpabasic.project_7lans.dto.activityLog;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public class ActivityLogResponseDto {

    // ================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: Relation id, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailListByVolunteer {
        @NotNull(message = "[ActivityLogResponseDto.detailListByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;
        @NotNull(message = "[ActivityLogResponseDto.detailListByVolunteer] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;
        @NotNull(message = "[ActivityLogResponseDto.detailListByVolunteer] approveStatus 은 Null 일 수 없습니다.")
        private boolean approveStatus;

        @Builder
        detailListByVolunteer(
                Long activityLogId,
                LocalDate dateInfo,
                boolean approveStatus
        ){
            this.activityLogId = activityLogId;
            this.dateInfo = dateInfo;
            this.approveStatus = approveStatus;
        }
    }

    // 봉사자 활동 일지 상세 조회
    // Req: Relation id, activityLog id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByVolunteer {
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] activityTime 은 Null 일 수 없습니다.")
        private Integer activityTime;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] centerName 은 Null 일 수 없습니다.")
        private String centerName;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] content 은 Null 일 수 없습니다.")
        private String content;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] writeDoneStatus 은 Null 일 수 없습니다.")
        private boolean writeDoneStatus;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] approveStatus 은 Null 일 수 없습니다.")
        private boolean approveStatus;


        @Builder
        detailByVolunteer(
                Long activityLogId,
                LocalDate dateInfo,
                Integer activityTime,
                String centerName,
                String volunteerName,
                String content,
                boolean writeDoneStatus,
                boolean approveStatus
        ){
            this.activityLogId = activityLogId;
            this.dateInfo = dateInfo;
            this.activityTime = activityTime;
            this.centerName = centerName;
            this.volunteerName = volunteerName;
            this.content = content;
            this.writeDoneStatus = writeDoneStatus;
            this.approveStatus = approveStatus;

        }
    }

    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음

    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음


    // ================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listApprovedByManager {
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] activityId 은 Null 일 수 없습니다.")
        private Long activityId;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] title 은 Null 일 수 없습니다.")
        private String title;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;


        @Builder
        listApprovedByManager(
                Long activityId,
                String title,
                String volunteerName,
                String childName,
                LocalDate dateInfo
        ){
            this.activityId = activityId;
            this.title = title;
            this.volunteerName = volunteerName;
            this.childName = childName;
            this.dateInfo = dateInfo;
        }
    }


    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listDisapprovedByManager {
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] activityId 은 Null 일 수 없습니다.")
        private Long activityId;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] title 은 Null 일 수 없습니다.")
        private String title;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;


        @Builder
        listDisapprovedByManager(
                Long activityId,
                String title,
                String volunteerName,
                String childName,
                LocalDate dateInfo
        ){
            this.activityId = activityId;
            this.title = title;
            this.volunteerName = volunteerName;
            this.childName = childName;
            this.dateInfo = dateInfo;
        }
    }

    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByManager {
        @NotNull(message = "[ActivityLogResponseDto.detailByManager] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] activityTime 은 Null 일 수 없습니다.")
        private Long activityTime;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] centerName 은 Null 일 수 없습니다.")
        private String centerName;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] writeDoneStatus 은 Null 일 수 없습니다.")
        private boolean writeDoneStatus;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] approveStatus 은 Null 일 수 없습니다.")
        private boolean approveStatus;

        @Builder
        detailByManager(
                Long activityLogId,
                LocalDate dateInfo,
                Long activityTime,
                String centerName,
                String volunteerName,
                String content,
                boolean writeDoneStatus,
                boolean approveStatus
        ){
            this.activityLogId = activityLogId;
            this.dateInfo = dateInfo;
            this.activityTime = activityTime;
            this.centerName = centerName;
            this.volunteerName = volunteerName;
            this.content = content;
            this.writeDoneStatus = writeDoneStatus;
            this.approveStatus = approveStatus;
        }
    }

    // 관리자 활동 일지 승인
    // Req: 관계 Id, 활동 일지 Id
    // Res: 없음
}
