package jpabasic.project_7lans.dto.child;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Volunteer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ChildResponseDto {

    // ===============================================================================
    // 조회

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[ChildResponseDto.detail] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.detail] childEmail 은 Null 일 수 없습니다.")
        private String childEmail;
        @NotNull(message = "[ChildResponseDto.detail] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.detail] childPhoneNumber 은 Null 일 수 없습니다.")
        private String childPhoneNumber;
        @NotNull(message = "[ChildResponseDto.detail] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.detail] childProfileImagePath 는 Null 일 수 없습니다.")
        private String childProfileImagePath;
        @NotNull(message = "[ChildResponseDto.detail] childEnterDate 는 Null 일 수 없습니다.")
        private LocalDateTime childEnterDate;
        @NotNull(message = "[ChildResponseDto.detail] childChildCenterId 는 Null 일 수 없습니다.")
        private Long childChildCenterId;
        @NotNull(message = "[ChildResponseDto.detail] childSpecialContent 는 Null 일 수 없습니다.")
        private String childSpecialContent;


        @Builder
        detail(
                Long childId,
                String childEmail,
                String childName,
                String childPhoneNumber,
                LocalDate childBirth,
                String childProfileImagePath,
                LocalDateTime childEnterDate,
                Long childChildCenterId,
                String childSpecialContent
        ){
            this.childId = childId;
            this.childEmail = childEmail;
            this.childName = childName;
            this.childPhoneNumber = childPhoneNumber;
            this.childBirth = childBirth;
            this.childProfileImagePath = childProfileImagePath;
            this.childEnterDate = childEnterDate;
            this.childChildCenterId = childChildCenterId;
            this.childSpecialContent = childSpecialContent;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[ChildResponseDto.detail] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.detail] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.detail] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.detail] childProfileImagePath 는 Null 일 수 없습니다.")
        private String childProfileImagePath;
        @NotNull(message = "[ChildResponseDto.detail] childChildCenterId 는 Null 일 수 없습니다.")
        private Long childChildCenterId;
        @NotNull(message = "[ChildResponseDto.detail] childSpecialContent 는 Null 일 수 없습니다.")
        private String childSpecialContent;


        @Builder
        list(
                Long childId,
                String childName,
                LocalDate childBirth,
                String childProfileImagePath,
                Long childChildCenterId,
                String childSpecialContent
        ){
            this.childId = childId;
            this.childName = childName;
            this.childBirth = childBirth;
            this.childProfileImagePath = childProfileImagePath;
            this.childChildCenterId = childChildCenterId;
            this.childSpecialContent = childSpecialContent;
        }
    }

    // ===============================================================================
    // 생성 매소드

    public static ChildResponseDto.list toListDto(Child child) {
        return ChildResponseDto.list.builder()
                .childId(child.getId())
                .childName(child.getName())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childChildCenterId(child.getChildCenter().getId())
                .childSpecialContent(child.getSpecialContent())
                .build();
    }

}
