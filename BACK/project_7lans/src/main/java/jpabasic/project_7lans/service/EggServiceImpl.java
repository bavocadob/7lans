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


}
