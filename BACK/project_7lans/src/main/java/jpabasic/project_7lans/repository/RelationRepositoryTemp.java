package jpabasic.project_7lans.repository;

import jakarta.persistence.EntityManager;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RelationRepositoryTemp {

    private final EntityManager em;

    //관계 저장
    public void save(ChildVolunteerRelation relation){
        //관계 중복 검사 => table에 복합키 돼있는데 필요 있는가?
        if(relation.getId() == null){
            em.persist(relation);
        }
        else{
            em.merge(relation);
        }
    }

    //관계 검색-전체
    public List<ChildVolunteerRelation> findAll(){
        return em.createQuery("select r from ChildVolunteerRelation r", ChildVolunteerRelation.class)
                .getResultList();
    }


    //관계 검색-아동관련

    //관계 검색-봉사자 관련

    //관계 검색-기관 관련
}
