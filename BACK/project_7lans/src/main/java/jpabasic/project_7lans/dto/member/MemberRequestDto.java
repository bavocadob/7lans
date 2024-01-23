package jpabasic.project_7lans.dto.member;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MemberRequestDto {

    // ===============================================================================
    // 가입(비밀번호)

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class sign {
        @NotNull(message = "[MemberRequestDto.sign] memberId 는 null 이 될 수 없습니다.")
        private String memberEmail;
        @NotNull(message = "[MemberRequestDto.sign] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;
        @NotNull(message = "[MemberRequestDto.sign] type을 선택해 주세요")
        private String memberType;
        @NotNull(message = "[MemberRequestDto.sign] memberType 는 null 이 될 수 없습니다.")
        private String memberName;
        @NotNull(message = "[MemberRequestDto.sign] memberPhoneNumber 는 null 이 될 수 없습니다.")
        private String memberPhoneNumber;
        @NotNull(message = "[MemberRequestDto.sign] memberbirth 는 null 이 될 수 없습니다.")
        private LocalDate memberbirth;
        private Long centerId;

        @Builder
        sign(
                String memberEmail,
                String memberPassword,
                String memberType,
                String memberName,
                String PhoneNumber,
                LocalDate memberbirth,
                Long centerId
        ){
            this.memberEmail = memberEmail;
            this.memberPassword = memberPassword;
            this.memberType = memberType;
            this.memberName = memberName;
            this.memberPhoneNumber = PhoneNumber;
            this.memberbirth = memberbirth;
            this.centerId = centerId;
        }
    }
    // ===============================================================================
    // 수정(비밀번호)

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class modifyPassword {
        @NotNull(message = "[MemberRequestDto.modifyPassword] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberRequestDto.modifyPassword] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;

        @Builder
        modifyPassword(
                Long memberId,
                String memberPassword
        ){
            this.memberId = memberId;
            this.memberPassword = memberPassword;
        }
    }

    // ===============================================================================
    // 탈퇴

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class delete {
        @NotNull(message = "[MemberRequestDto.delete] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberRequestDto.delete] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;

        @Builder
        delete(
                Long memberId,
                String memberPassword
        ){
          this.memberId = memberId;
          this.memberPassword = memberPassword;
        }
    }
}
