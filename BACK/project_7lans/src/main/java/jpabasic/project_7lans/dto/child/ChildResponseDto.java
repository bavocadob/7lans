package jpabasic.project_7lans.dto.child;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.entity.Child;
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
    @Builder
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

        public static ChildResponseDto.detail toDetailDto(Child child){
            return ChildResponseDto.detail.builder()
                    .childId(child.getId())
                    .childEmail(child.getEmail())
                    .childName(child.getName())
                    .childPhoneNumber(child.getPhoneNumber())
                    .childBirth(child.getBirth())
                    .childProfileImagePath(child.getProfileImgPath())
                    .childEnterDate(child.getEnterDate())
                    .childChildCenterId(child.getChildCenter().getId())
                    .childSpecialContent(child.getSpecialContent())
                    .build();
        }
    }

    // ===============================================================================
    // 수정??
}
