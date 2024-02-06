package jpabasic.project_7lans.childCenter.service;

import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.childCenter.dto.ChildCenterResponseDto;
import jpabasic.project_7lans.member.dto.member.MemberRequestDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface ChildCenterService {

    public List<VolunteerResponseDto.list> volunteerList(Long centerId);

    public List<ChildResponseDto.noRelationList> childList(Long centerId);

    List<ChildCenterResponseDto.list> list();

    void centerRegister(MemberRequestDto.centerDto centerDto);
}
