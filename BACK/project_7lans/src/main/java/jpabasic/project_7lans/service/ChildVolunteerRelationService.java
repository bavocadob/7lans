package jpabasic.project_7lans.service;


import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.repository.ChildVolunteerRelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface ChildVolunteerRelationService {

    ChildVolunteerRelation createRelation(Member volunteer, Member child, ChildCenter childCenter);
}
