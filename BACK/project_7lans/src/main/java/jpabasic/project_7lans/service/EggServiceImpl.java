package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Egg;
import jpabasic.project_7lans.repository.EggRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class EggServiceImpl {

    public final EggRepository eggRepository;

    //관련된 전체 egg조회
    public List<Egg> findAllEgg(ChildVolunteerRelation relation){
        return eggRepository.findByRelation(relation);
    }

    //egg open 후 새로운 egg 생성
    public Egg openEgg(Egg curEgg){
        //open
        curEgg.open();

        Egg newEgg = Egg.createEgg(curEgg.getChildVolunteerRelation());

        eggRepository.save(newEgg);

        return newEgg;
    }

    //openable
    public void changeEggOpenable(Egg egg){
        egg.changeStatusOpenable();
    }

}
