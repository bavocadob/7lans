package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.repository.ChildVolunteerRelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChildVolunteerRelationServiceImpl implements ChildVolunteerRelationService {
    private final ChildVolunteerRelationRepository childVolunteerRelationRepository;


    public List<ChildVolunteerRelation> findByVolunteerId(Long volunteerId) {
        return childVolunteerRelationRepository.findByVolunteerId(volunteerId);
    }

    public List<ChildVolunteerRelation> findByChildId(Long childId) {
        return childVolunteerRelationRepository.findByChildId(childId);
    }


    @Override
    public ChildVolunteerRelation createRelation(Member volunteer, Member child, ChildCenter childCenter) {
        ChildVolunteerRelation relation = new ChildVolunteerRelation();
        relation.setVolunteer(volunteer);
        relation.setChild(child);
        relation.setChildCenter(childCenter);
        return childVolunteerRelationRepository.save(relation);
    }
}
