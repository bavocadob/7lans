package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;

import java.util.List;

public interface ChildVolunteerRelationService {
    List<ChildVolunteerRelation> childList(Long volunteerId);
}
