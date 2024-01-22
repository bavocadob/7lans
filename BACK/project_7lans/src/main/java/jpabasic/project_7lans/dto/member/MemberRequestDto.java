package jpabasic.project_7lans.dto.member;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberRequestDto {

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
