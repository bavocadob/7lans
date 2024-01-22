package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Egg;

import java.util.List;

public interface EggService {

    public List<Egg> findAllEgg(ChildVolunteerRelation relation);

    //egg open 후 새로운 egg 생성
    public Egg openEgg(Egg curEgg);

    //openable
    public void changeEggOpenable(Egg egg);
}
