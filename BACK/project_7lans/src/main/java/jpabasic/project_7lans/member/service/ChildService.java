package jpabasic.project_7lans.member.service;

import jpabasic.project_7lans.member.dto.child.ChildRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface ChildService {
    public List<VolunteerResponseDto.list> volunteerList(Long childId);

    public ChildResponseDto.detail childDetail(Long childId);

    public void modifyContent(ChildRequestDto.childWithContent childWtihContent);
}
