package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildResponseDto;

import java.util.List;

public interface VolunteerService {
    public List<ChildResponseDto.list> childList(Long volunteerId);
}
