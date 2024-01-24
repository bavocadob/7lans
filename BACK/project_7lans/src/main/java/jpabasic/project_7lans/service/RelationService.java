package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.Relation;

import java.util.List;

public interface RelationService {
    List<Relation> childList(Long volunteerId);
}
