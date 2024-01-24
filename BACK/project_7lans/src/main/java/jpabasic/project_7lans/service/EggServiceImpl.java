package jpabasic.project_7lans.service;

import jpabasic.project_7lans.repository.EggRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class EggServiceImpl {

    public final EggRepository eggRepository;


}
