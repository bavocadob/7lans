package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.*;
import jpabasic.project_7lans.repository.ChildCenterRepository;
import jpabasic.project_7lans.repository.ChildVolunteerRelationRepository;
import jpabasic.project_7lans.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ChildVolunteerRelationServiceImplTest {

    @Autowired
    private ChildVolunteerRelationServiceImpl childVolunteerRelationService;

    @MockBean
    private ChildVolunteerRelationRepository childVolunteerRelationRepository;
    @MockBean
    private MemberRepository memberRepository;
    @MockBean
    private ChildCenterRepository childCenterRepository;


    @Test
    void findByVolunteerIdTest() {
        Long volunteerId = 1L;

        Member volunteer = new Volunteer();
        volunteer.setId(volunteerId);
        memberRepository.save(volunteer);
        Member child1 = new Child();
        Member child2 = new Child();
        child1.setId(2L);
        child2.setId(3L);
        memberRepository.save(child1);
        memberRepository.save(child2);

        ChildCenter childCenter = new ChildCenter();
        childCenter.setId(1L);
        childCenterRepository.save(childCenter);


        ChildVolunteerRelation relation1 = childVolunteerRelationService.createRelation(volunteer, child1, childCenter);
        ChildVolunteerRelation relation2 = childVolunteerRelationService.createRelation(volunteer, child2, childCenter);

        when(childVolunteerRelationRepository.findByVolunteerId(volunteerId))
                .thenReturn(Arrays.asList(relation1, relation2));

        List<ChildVolunteerRelation> relations = childVolunteerRelationService.findByVolunteerId(volunteerId);

        assertEquals(2, relations.size());
        assertEquals(relation1, relations.get(0));

        verify(childVolunteerRelationRepository, times(1)).findByVolunteerId(volunteerId);
    }

    @Test
    void findByChildId() {
    }

    @Test
    void createRelation() {
        Member volunteer = new Volunteer();
        volunteer.setId(1L);
        memberRepository.save(volunteer);
        Member child = new Child();
        child.setId(1L);
        memberRepository.save(child);
        ChildCenter childCenter = new ChildCenter();
        childCenter.setId(1L);
        childCenterRepository.save(childCenter);


        ChildVolunteerRelation relation = childVolunteerRelationService.createRelation(volunteer, child, childCenter);
        assertNotNull(relation);
        assertEquals(volunteer, relation.getVolunteer());
        assertEquals(child, relation.getChild());
        assertEquals(childCenter, relation.getChildCenter());
    }
}