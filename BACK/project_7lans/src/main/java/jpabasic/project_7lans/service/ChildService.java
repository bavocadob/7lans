package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface ChildService {
    public List<VolunteerResponseDto.list> volunteerList(Long childId);

    public ChildResponseDto.detail childDetail(Long childId);
}
