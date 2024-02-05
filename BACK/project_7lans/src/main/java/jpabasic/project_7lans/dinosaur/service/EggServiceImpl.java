package jpabasic.project_7lans.dinosaur.service;

import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.dinosaur.entity.Egg;
import jpabasic.project_7lans.dinosaur.repository.EggRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class EggServiceImpl implements EggService{

    public final EggRepository eggRepository;

    @Override
    public EggResponseDto.detail getMyEgg(Long eggId) {
        Egg egg = eggRepository.findById(eggId).orElseThrow();
        return EggResponseDto.detail.toDto(egg);
    }


}
