package jpabasic.project_7lans.dto;

import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.ChildCenter;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter @SuperBuilder
public class ChildDto extends MemberDto {
    private ChildCenter childCenter;
    private String specialContent;

    public Child toEntity() {
        return Child.builder()
                .email(getEmail())
                .socialId(getSocialId())
                .password(getPassword())
                .phoneNumber(getPhoneNumber())
                .profileImgPath(getProfileImgPath())
                .socialType(getSocialType())
                .birth(getBirth())
                .childCenter(getChildCenter())
                .specialContent(getSpecialContent())
                .build();
    }


}
