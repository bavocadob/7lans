package jpabasic.project_7lans.dto.child;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;



public class ChildRequestDto {
    // ===============================================================================
    // 회원가입

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class register {
        @NotNull(message = "[ChildRequestDto.register] childEmail 은 Null 일 수 없습니다.")
        private String childEmail;
        @NotNull(message = "[ChildRequestDto.register] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildRequestDto.register] childPassword 은 Null 일 수 없습니다.")
        private String childPassword;
        @NotNull(message = "[ChildRequestDto.register] childPhoneNumber 은 Null 일 수 없습니다.")
        private String childPhoneNumber;
        @NotNull(message = "[ChildRequestDto.register] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildRequestDto.register] childChildCenterId 은 Null 일 수 없습니다.")
        private Long childChildCenterId;

        @Builder
        register(
                String childEmail,
                String childName,
                String childPassword,
                String childPhoneNumber,
                LocalDate childBirth,
                Long childChildCenterId
        ){
          this.childEmail = childEmail;
          this.childName = childName;
          this.childPassword = childPassword;
          this.childPhoneNumber = childPhoneNumber;
          this.childBirth = childBirth;
          this.childChildCenterId = childChildCenterId;
        }
    }

    // ===============================================================================
    // 조회

    // Id 로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailById {
        @NotNull(message = "[ChildRequestDto.detailById] childId 은 Null 일 수 없습니다.")
        private Long childId;

        @Builder
        detailById(
                Long childId
        ){
            this.childId = childId;
        }
    }

    // Email 로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByEmail {
        @NotNull(message = "[ChildRequestDto.detailByEmail] childEmail 은 Null 일 수 없습니다.")
        private String childEmail;

        @Builder
        detailByEmail(
                String childEmail
        ){
            this.childEmail = childEmail;
        }
    }

    // Name 으로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByName {
        @NotNull(message = "[ChildRequestDto.detailByName] childName 은 Null 일 수 없습니다.")
        private String childName;

        @Builder
        detailByName(
                String childName
        ){
            this.childName = childName;
        }
    }

    // 센터 ID로 소속된 아이들 리스트 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class childListByChildCenter{
        @NotNull(message = "[ChildRequestDto.childListByChildCenter] childCenterId 은 Null 일 수 없습니다.")
        private Long childCenterId;

        @Builder
        childListByChildCenter(
                Long childCenterId
        ){
            this.childCenterId = childCenterId;
        }
    }

    // ===============================================================================
    // 수정

    // 수정(비밀번호) -> MemberRequestDto에 존재.
    // public static class modifyPassword { }

    // ===============================================================================
    // 탈퇴 -> MemberRequestDto에 존재.
    // public static class delete { }

}