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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;
    private final VolunteerRepository volunteerRepository;
    private final ManagerRepository managerRepository;
    private final ChildCenterRepository childCenterRepository;
    private final RelationRepository relationRepository;

//=========================================
    //회원가입
    @Override
    @Transactional
    public void childRegister(MemberRequestDto.sign memberDto) {

        ChildRequestDto.register childRegisterDto = ChildRequestDto.register.builder()
                .childEmail(memberDto.getMemberEmail())
                .childName(memberDto.getMemberName())
                .childPassword(memberDto.getMemberPassword())
                .childPhoneNumber(memberDto.getMemberPhoneNumber())
                .childBirth(memberDto.getMemberbirth())
                .childChildCenterId(memberDto.getCenterId())
                .build();


        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(childRegisterDto.getChildEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        System.out.println(childRegisterDto.getChildChildCenterId());
        // 예외가 발생 안하면 가입 처리
        ChildCenter childCenter = childCenterRepository.findById(childRegisterDto.getChildChildCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.childRegister] 해당 센터 ID와 일치하는 센터가 존재하지 않습니다."));

        Child child = Child.builder()
                .email(childRegisterDto.getChildEmail())
                .name(childRegisterDto.getChildName())
                .password(childRegisterDto.getChildPassword())
                .phoneNumber(childRegisterDto.getChildPhoneNumber())
                .birth(childRegisterDto.getChildBirth())
                .childCenter(childCenter)
                .memberType(MemberType.CHILD)
                .build();

        memberRepository.save(child);
    }

    @Override
    @Transactional
    public void volunteerRegister(MemberRequestDto.sign memberDto) {

        VolunteerRequestDto.register volunteerRegisterDto = VolunteerRequestDto.register.builder()
                .volunteerEmail(memberDto.getMemberEmail())
                .volunteerName(memberDto.getMemberName())
                .volunteerPassword(memberDto.getMemberPassword())
                .volunteerPhoneNumber(memberDto.getMemberPhoneNumber())
                .volunteerBirth(memberDto.getMemberbirth())
                .build();
        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(volunteerRegisterDto.getVolunteerEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        // 예외가 발생 안하면 가입 처리
        Volunteer volunteer = Volunteer.builder()
                .email(volunteerRegisterDto.getVolunteerEmail())
                .name(volunteerRegisterDto.getVolunteerName())
                .password(volunteerRegisterDto.getVolunteerPassword())
                .phoneNumber(volunteerRegisterDto.getVolunteerPhoneNumber())
                .birth(volunteerRegisterDto.getVolunteerBirth())
                .memberType(MemberType.VOLUNTEER)
                .build();

        memberRepository.save(volunteer);
    }

    @Override
    public void managerRegister(MemberRequestDto.sign memberDto) {

        ManagerRequestDto.register managerRegisterDto = ManagerRequestDto.register.builder()
                .managerEmail(memberDto.getMemberEmail())
                .managerName(memberDto.getMemberName())
                .managerPassword(memberDto.getMemberPassword())
                .managerPhoneNumber(memberDto.getMemberPhoneNumber())
                .managerBirth(memberDto.getMemberbirth())
                .managerChildCenterId(10l)
                .build();
        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(managerRegisterDto.getManagerEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        // 예외가 발생 안하면 가입 처리
        ChildCenter childCenter = childCenterRepository.findById(managerRegisterDto.getManagerChildCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.managerRegister] 해당 센터 ID와 일치하는 센터가 존재하지 않습니다."));

        Manager manager = Manager.builder()
                .email(managerRegisterDto.getManagerEmail())
                .name(managerRegisterDto.getManagerName())
                .password(managerRegisterDto.getManagerPassword())
                .phoneNumber(managerRegisterDto.getManagerPhoneNumber())
                .birth(managerRegisterDto.getManagerBirth())
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
