package jpabasic.project_7lans.dto.member;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.entity.MemberType;
import lombok.*;

import java.time.LocalDate;

public class MemberResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class loginResponseDto {
        @NotNull(message = "[MemberResponseDto.loginResponseDto] timeDto 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberResponseDto.loginResponseDto] timeDto 는 null 이 될 수 없습니다.")
        private MemberType memberType;
        @NotNull(message = "[MemberResponseDto.loginResponseDto] timeDto 는 null 이 될 수 없습니다.")
        private String email;
        @NotNull(message = "[MemberResponseDto.loginResponseDto] timeDto 는 null 이 될 수 없습니다.")
        private String password;
        @NotNull(message = "[MemberResponseDto.loginResponseDto] timeDto 는 null 이 될 수 없습니다.")
        private String phoneNumber;
        @NotNull(message = "[MemberResponseDto.loginResponseDto] timeDto 는 null 이 될 수 없습니다.")
        private String profileImgPath;
        @NotNull(message = "[MemberResponseDto.loginResponseDto] timeDto 는 null 이 될 수 없습니다.")
        private LocalDate birth;

        @Builder
        loginResponseDto(
                Long memberId,
                MemberType memberType,
                String email,
                String password,
                String phoneNumber,
                String profileImgPath,
                LocalDate birth
        ){
           this.memberId = memberId;
           this.memberType = memberType;
           this.email = email;
           this.password = password;
           this.phoneNumber = phoneNumber;
           this.profileImgPath = profileImgPath;
           this.birth = birth;
        }
    }
}
