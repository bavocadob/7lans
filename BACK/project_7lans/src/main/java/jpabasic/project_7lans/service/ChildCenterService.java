package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.childCenter.ChildCenterResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface ChildCenterService {

    public List<VolunteerResponseDto.list> volunteerList(Long centerId);

    public List<ChildResponseDto.list> childList(Long centerId);

    List<ChildCenterResponseDto.list> list();
}
