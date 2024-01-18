package jpabasic.project_7lans.dto;

import jpabasic.project_7lans.entity.SocialType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@SuperBuilder
@NoArgsConstructor
public class MemberDto {
    private String email;
    private String socialId;
    private String password;
    private String phoneNumber;
    private String profileImgPath;
    private SocialType socialType;
    private LocalDate birth;
}
