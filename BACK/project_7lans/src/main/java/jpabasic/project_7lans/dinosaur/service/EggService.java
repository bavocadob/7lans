package jpabasic.project_7lans.dinosaur.service;

import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.dinosaur.entity.Egg;

import java.util.List;

public interface EggService {

//    public List<Egg> findAllEgg(Relation relation);
//
//    //egg open 후 새로운 egg 생성
//    public Egg openEgg(Egg curEgg);
//
//    //openable
//    public void changeEggOpenable(Egg egg);

    public EggResponseDto.detail getMyEgg(Long eggId);

}
