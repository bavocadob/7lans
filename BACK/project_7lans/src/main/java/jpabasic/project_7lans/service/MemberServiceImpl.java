package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.manager.ManagerRequestDto;
import jpabasic.project_7lans.dto.manager.ManagerResponseDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.*;
import jpabasic.project_7lans.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final DinosaurRepository dinosaurRepository;
    private final ChildCenterRepository childCenterRepository;

    //=========================================
    //회원가입
    @Override
    @Transactional
    public void childRegister(MemberRequestDto.sign memberDto) {
        log.info("childRegister Start...");

        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(memberDto.getMemberEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        // 예외가 발생 안하면 가입 처리
        ChildCenter childCenter = childCenterRepository.findById(memberDto.getCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.childRegister] 해당 센터 ID와 일치하는 센터가 존재하지 않습니다."));

        // 가입 할 때 공룡도감의 기본 공룡 1번
        Dinosaur dinosaur = dinosaurRepository.findById(1L)
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.childRegister] no such dinosaur"));


        // 멤버에게 추가해 줄 공룡도감 생성
        DinosaurBook dinosaurBook = DinosaurBook.builder()
                .myDinosaur(dinosaur)
                .build();

        // 아동 생성
        Child child = Child.builder()
                .email(memberDto.getMemberEmail())
                .name(memberDto.getMemberName())
                .password(memberDto.getMemberPassword())
                .phoneNumber(memberDto.getMemberPhoneNumber())
                .birth(memberDto.getMemberBirth())
                .dinosaurBook(dinosaurBook)
                .memberType(MemberType.CHILD)
                .build();

        // 공룡도감의 주인을 아동으로 설정.
        dinosaurBook.setMember(child);

        // 아동센터의 아동 리스트에 방금 만든 아동 추가.
        childCenter.addChildList(child);

        // 아동을 DB에 저장
        memberRepository.save(child);

        log.info("childRegister success return: childId:{} childName:{} childType:{}"+child.getId()+child.getName()+child.getMemberType());
    }

    @Override
    @Transactional
    public void volunteerRegister(MemberRequestDto.sign memberDto) {

        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(memberDto.getMemberEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        // 가입 할 때 공룡도감의 기본 공룡 1번
        Dinosaur dinosaur = dinosaurRepository.findById(1L)
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.childRegister] no such dinosaur"));


        // 멤버에게 추가해 줄 공룡도감 생성
        DinosaurBook dinosaurBook = DinosaurBook.builder()
                .myDinosaur(dinosaur)
                .build();

        // 예외가 발생 안하면 가입 처리
        // 봉사자 생성
        Volunteer volunteer = Volunteer.builder()
                .email(memberDto.getMemberEmail())
                .name(memberDto.getMemberName())
                .password(memberDto.getMemberPassword())
                .phoneNumber(memberDto.getMemberPhoneNumber())
                .birth(memberDto.getMemberBirth())
                .memberType(MemberType.VOLUNTEER)
                .dinosaurBook(dinosaurBook)
                .build();

        // 공룡도감의 주인을 봉사자로 설정.
        dinosaurBook.setMember(volunteer);

        memberRepository.save(volunteer);
    }

    @Transactional
    @Override
    public void managerRegister(MemberRequestDto.sign memberDto) {

        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(memberDto.getMemberEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");


        System.out.println(memberDto.getCenterId());
        // 예외가 발생 안하면 가입 처리
        ChildCenter childCenter = childCenterRepository.findById(memberDto.getCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.managerRegister] 해당 센터 ID와 일치하는 센터가 존재하지 않습니다."));

        Manager manager = Manager.builder()
                .email(memberDto.getMemberEmail())
                .name(memberDto.getMemberName())
                .password(memberDto.getMemberPassword())
                .phoneNumber(memberDto.getMemberPhoneNumber())
                .birth(memberDto.getMemberBirth())
                .childCenter(childCenter)
                .memberType(MemberType.MANAGER)
                .build();

        memberRepository.save(manager);
    }

    //================================================================================
    //로그인
    @Override
    public Member login(MemberRequestDto.login memberRegisterDto) {

        Member findMember = memberRepository.findByEmail(memberRegisterDto.getMemberEmail())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.login] 존재하지 않는 멤버 Email입니다."));
        return findMember;
    }

    @Transactional
    @Override
    public void deleteMember(MemberRequestDto.delete memberDto) {
        // 해당 사람의 비밀번호가 일치하는지 확인
        Member member = memberRepository.findById(memberDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[MemberServiceImpl.deleteMember] 해당 Id와 일치하는 Member가 존재하지 않습니다."));

        // 일치하면 탈퇴 처리
        if(memberDto.getMemberPassword().equals(member.getPassword()))
            memberRepository.delete(member);
    }


}
