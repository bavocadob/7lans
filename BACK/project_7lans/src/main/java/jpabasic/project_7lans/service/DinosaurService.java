package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.dinosaur.DinosaurRequestDto;
import jpabasic.project_7lans.dto.dinosaur.DinosaurResponseDto;
import jpabasic.project_7lans.dto.egg.EggRequestDto;
import jpabasic.project_7lans.dto.egg.EggResponseDto;
import jpabasic.project_7lans.entity.Dinosaur;

import java.util.List;

public interface DinosaurService {

    // TODO 인자 DTO로 받기
    public DinosaurResponseDto.list getAllDinosaursForMember(Long memberId);

    public DinosaurResponseDto.detail getDinosaurDetail(Long dinosaurId);

    public DinosaurResponseDto.hatch acquireDinosaur(DinosaurRequestDto.acquire requestDto);
    public void changeMyDinosaur(DinosaurRequestDto.change requestDto);
    public EggResponseDto.detail getMyEgg(Long eggId);



}
