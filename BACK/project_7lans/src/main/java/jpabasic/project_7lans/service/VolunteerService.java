package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface VolunteerService {
    public List<ChildResponseDto.list> childList(Long volunteerId);

    public VolunteerResponseDto.detail volunteerDetail(Long volunteerId);

    public List<VolunteerResponseDto.noRelationList> volunteerListByName(VolunteerRequestDto.detailByName reqDto);

    public Integer getVolunteerTime(Long volunteerId);

    public List<VolunteerResponseDto.listByManager> volunteerListAllByManager();
}
