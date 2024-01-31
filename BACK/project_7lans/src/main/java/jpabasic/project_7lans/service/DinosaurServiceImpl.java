package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.dinosaur.DinosaurRequestDto;
import jpabasic.project_7lans.dto.dinosaur.DinosaurResponseDto;
import jpabasic.project_7lans.dto.egg.EggResponseDto;
import jpabasic.project_7lans.entity.*;
import jpabasic.project_7lans.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class DinosaurServiceImpl implements DinosaurService {

    private final DinosaurRepository dinosaurRepository;
    private final MemberRepository memberRepository;
    private final RelationRepository relationRepository;
    private final EggRepository eggRepository;


    @Override
    public DinosaurResponseDto.list getAllDinosaursForMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("[DinosaurServiceImpl.getAllDinosaursForMember] 해당 멤버 ID 일치하는 멤버가 존재하지 않습니다."));

        Dinosaur myDinosaur = member.getDinosaurBook().getMyDinosaur();

        List<DinosaurCollection> dinosaurCollection = member.getDinosaurBook().getDinosaurCollection();
        List<Dinosaur> allDinosaurs = dinosaurRepository.findAll();

        DinosaurResponseDto.list response = DinosaurResponseDto.list.builder()
                .myDinosaur(DinosaurResponseDto.detail.toDto(myDinosaur))
                .build();

        for (Dinosaur dinosaur : allDinosaurs) {
            // TODO 우선 O(N^2)으로 만들어 놓음
            boolean isOwned = dinosaurCollection
                    .stream()
                    .anyMatch(collection -> collection.getDinosaur().getId().equals(dinosaur.getId()));

            response.getDinosaurs().add(DinosaurResponseDto.detail.toDto(dinosaur, isOwned));
        }

        return response;
    }

    @Override
    public DinosaurResponseDto.detail getDinosaurDetail(Long dinosaurId) {
        Dinosaur dinosaur = dinosaurRepository.findById(dinosaurId)
                .orElseThrow();

        return DinosaurResponseDto.detail.toDto(dinosaur);
    }

    @Transactional
    @Override
    public DinosaurResponseDto.hatch acquireDinosaur(DinosaurRequestDto.acquire requestDto) {

        // TODO 수행하는게 많아서 리뷰해야함

        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버가 없습니다. id=" + requestDto.getMemberId()));

        Relation relation = relationRepository.findById(requestDto.getRelationId())
                .orElseThrow(() -> new IllegalArgumentException("해당 관계가 없습니다."));

        Egg egg = relation.getEgg();
        Dinosaur dinosaur = egg.getDinosaur();
        DinosaurBook dinosaurBook = member.getDinosaurBook();

        // 이미 가지고 있는 공룡이라서 획득하지 못한 경우 false
        // 처음 얻은 공룡이라 획득한 경우 true
        boolean isAdded = dinosaurBook.addNewDinosaur(dinosaur);

        egg.changeCheckByMemberType(member);


        if (egg.isChildCheck() && egg.isVolunteerCheck()) {
            List<Dinosaur> allDinosaurs = dinosaurRepository.findAll();
            Dinosaur newDinosaur = allDinosaurs.get(new Random().nextInt(allDinosaurs.size()));
            egg.resetEgg(newDinosaur);
        }

        return DinosaurResponseDto.hatch.toDto(dinosaur, isAdded);
    }

    @Override
    public void changeMyDinosaur(DinosaurRequestDto.change requestDto) {
        DinosaurBook dinosaurBook = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 Member가 없습니다. id=" + requestDto.getMemberId()))
                .getDinosaurBook();

        Dinosaur dinosaur = dinosaurRepository.findById(requestDto.getDinosaurId())
                .orElseThrow(() -> new IllegalArgumentException("해당 Dinosaur가 없습니다. id=" + requestDto.getDinosaurId()));

        dinosaurBook.changeMyDinosaur(dinosaur);
    }

    @Override
    public EggResponseDto.detail getMyEgg(Long eggId) {
        Egg egg = eggRepository.findById(eggId).orElseThrow();
        return EggResponseDto.detail.toDto(egg);
    }



}