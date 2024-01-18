package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Volunteer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
public class RelationRepositoryTest {

    @Autowired
    RelationRepository repository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CenterRepository centerRepository;

    @Test
    public void CRTest(){

        //C
//        ChildVolunteerRelation relation = new ChildVolunteerRelation();
//        Child c = new Child();
//        c.setId(10L);
//        c.setName("chi");
//
//        Child c2 = new Child();
//        c2.setId(20l);
//        c2.setName("child2");
//
//        memberRepository.save(c2);
//
//        Volunteer v = new Volunteer();
//        v.setId(10l);
//        v.setName("volun");
//
//        Volunteer v2 = new Volunteer();
//        v2.setId(20l);
//        v2.setName("v2");
//
//        memberRepository.save(v2);
//        memberRepository.save(c);
//        memberRepository.save(v);
//
//        ChildCenter center = new ChildCenter();
//        center.setId(10l);
//        center.setName("center1");
//
//        centerRepository.save(center);
//
//
//        relation.setChild(c);
//        relation.setVolunteer(v);
//        relation.setChildCenter(center);
//        repository.save(relation);
//
//        ChildVolunteerRelation relation2 = new ChildVolunteerRelation();
//        relation2.setChild(c2);
//        relation2.setVolunteer(v2);
//        relation2.setChildCenter(center);
//        repository.save(relation2);
//
//
//        //전체 조회
//        List<ChildVolunteerRelation> all = repository.findAll();
//        //System.out.println(all.get(0).getChild().getName());
//
//        //아동 이름으로 조회
//        List<ChildVolunteerRelation> childBase = repository.findByChild(c);
//
//
//        //봉사자 이름으로 조회
//        List<ChildVolunteerRelation> select = repository.findByVolunteer(v);
//        for(ChildVolunteerRelation s : select){
//            System.out.println(s.getChild().getName());
//        }
//
//        //센터로 조회
//        List<ChildVolunteerRelation> centerBase = repository.findByCenter(center);
    }

}