package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Volunteer;
import jpabasic.project_7lans.repository.ChildVolunteerRelationRepository;
import jpabasic.project_7lans.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildVolunteerRelationServiceImpl implements ChildVolunteerRelationService{

    private final ChildVolunteerRelationRepository relationRepository;
    private final VolunteerRepository volunteerRepository;
    @Override
    public List<ChildVolunteerRelation> childList(Long volunteerId) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("[MemberServiceImpl.deleteMember] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));

        return relationRepository.findByVolunteer(volunteer);
    }
}
