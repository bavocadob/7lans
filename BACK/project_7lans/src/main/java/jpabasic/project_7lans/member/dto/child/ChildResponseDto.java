package jpabasic.project_7lans.member.dto.child;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.relation.entity.Relation;
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
        @NotNull(message = "[ChildResponseDto.detail] childCenterName 는 Null 일 수 없습니다.")
        private String childCenterName;
        @NotNull(message = "[ChildResponseDto.detail] childSpecialContent 는 Null 일 수 없습니다.")
        private String childSpecialContent;

        public static ChildResponseDto.detail toDetailDto(Child child){
            return detail.builder()
                    .childId(child.getId())
                    .childEmail(child.getEmail())
                    .childName(child.getName())
                    .childPhoneNumber(child.getPhoneNumber())
                    .childBirth(child.getBirth())
                    .childProfileImagePath(child.getProfileImgPath())
                    .childEnterDate(child.getEnterDate())
                    .childCenterName(child.getChildCenter().getName())
                    .childSpecialContent(child.getSpecialContent())
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[ChildResponseDto.list] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.list] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.list] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.list] childProfileImagePath 는 Null 일 수 없습니다.")
        private String childProfileImagePath;
        @NotNull(message = "[ChildResponseDto.list] childCenterName 는 Null 일 수 없습니다.")
        private String childCenterName;
        @NotNull(message = "[ChildResponseDto.list] childSpecialContent 는 Null 일 수 없습니다.")
        private String childSpecialContent;
        @NotNull(message = "[ChildResponseDto.list] relationId 는 Null 일 수 없습니다.")
        private Long relationId;



        @Builder
        list(
                Long childId,
                String childName,
                LocalDate childBirth,
                String childProfileImagePath,
                String childCenterName,
                String childSpecialContent,
                Long relationId
        ){
            this.childId = childId;
            this.childName = childName;
            this.childBirth = childBirth;
            this.childProfileImagePath = childProfileImagePath;
            this.childCenterName = childCenterName;
            this.childSpecialContent = childSpecialContent;
            this.relationId = relationId;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class noRelationList {
        @NotNull(message = "[ChildResponseDto.list] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.list] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.list] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.list] childPhoneNumber 은 Null 일 수 없습니다.")
        private String childPhoneNumber;
        @NotNull(message = "[ChildResponseDto.list] childChildCenterId 는 Null 일 수 없습니다.")
        private String childCenterName;

        @Builder
        noRelationList(
                Long childId,
                String childName,
                LocalDate childBirth,
                String childPhoneNumber,
                String childCenterName
        ){
            this.childId = childId;
            this.childName = childName;
            this.childBirth = childBirth;
            this.childPhoneNumber = childPhoneNumber;
            this.childCenterName = childCenterName;
        }
    }

    // ===============================================================================
    // 생성 매소드

    public static ChildResponseDto.list toListDto(Child child, Relation relation) {
        return list.builder()
                .childId(child.getId())
                .childName(child.getName())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childCenterName(child.getChildCenter().getName())
                .childSpecialContent(child.getSpecialContent())
                .relationId(relation.getId())
                .build();
    }

    public static ChildResponseDto.noRelationList toNoRelationListDto(Child child) {
        return noRelationList.builder()
                .childId(child.getId())
                .childName(child.getName())
                .childBirth(child.getBirth())
                .childCenterName(child.getChildCenter().getName())
                .childPhoneNumber(child.getPhoneNumber())
                .build();
    }

}
