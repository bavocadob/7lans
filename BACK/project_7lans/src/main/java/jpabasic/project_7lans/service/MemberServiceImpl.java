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
    private final ChildVolunteerRelationRepository childVolunteerRelationRepository;


    @Override
    public void childRegister(ChildRequestDto.register childRegisterDto) {
        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(childRegisterDto.getChildEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

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
                .build();

        memberRepository.save(child);
    }

    @Override
    @Transactional
    public void volunteerRegister(VolunteerRequestDto.register volunteerRegisterDto) {
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
                .build();

        memberRepository.save(volunteer);
    }

    @Override
    public void managerRegister(ManagerRequestDto.register managerRegisterDto) {
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
                .build();

        memberRepository.save(manager);
    }

    @Override
    public ChildResponseDto.detail childDetailById(ChildRequestDto.detailById childDto) {
        Child child = childRepository.findById(childDto.getChildId())
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.childDetailById] 해당 아동 ID에 일치하는 아동이 존재하지 않습니다."));

        return ChildResponseDto.detail.builder()
                .childId(child.getId())
                .childEmail(child.getEmail())
                .childName(child.getName())
                .childPhoneNumber(child.getPhoneNumber())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childEnterDate(child.getEnterDate())
                .childChildCenterId(child.getChildCenter().getId())
                .childSpecialContent(child.getSpecialContent())
                .build();
    }

    @Override
    public ChildResponseDto.detail childDetailByEmail(ChildRequestDto.detailByEmail childDto) {
        Child child = childRepository.findByEmail(childDto.getChildEmail())
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.childDetailByEmail] 해당 아동 ID에 일치하는 아동이 존재하지 않습니다."));

        return ChildResponseDto.detail.builder()
                .childId(child.getId())
                .childEmail(child.getEmail())
                .childName(child.getName())
                .childPhoneNumber(child.getPhoneNumber())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childEnterDate(child.getEnterDate())
                .childChildCenterId(child.getChildCenter().getId())
                .childSpecialContent(child.getSpecialContent())
                .build();
    }

    @Override
    public ChildResponseDto.detail childDetailByName(ChildRequestDto.detailByName childDto) {
        Child child = childRepository.findByName(childDto.getChildName())
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.childDetailByName] 해당 아동 ID에 일치하는 아동이 존재하지 않습니다."));

        return ChildResponseDto.detail.builder()
                .childId(child.getId())
                .childEmail(child.getEmail())
                .childName(child.getName())
                .childPhoneNumber(child.getPhoneNumber())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childEnterDate(child.getEnterDate())
                .childChildCenterId(child.getChildCenter().getId())
                .childSpecialContent(child.getSpecialContent())
                .build();
    }

    @Override
    public List<ChildResponseDto.detail> childListByCenterId(ChildRequestDto.childListByChildCenter childCenterDto) {
        ChildCenter childCenter = childCenterRepository.findById(childCenterDto.getChildCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.managerRegister] 해당 센터 ID와 일치하는 센터가 존재하지 않습니다."));

        List<Child> childList = childRepository.findByChildCenter(childCenter);
        ArrayList<ChildResponseDto.detail> childDtoList = new ArrayList<>();

        for (int i = 0, childListSize = childList.size(); i < childListSize; i++) {
            Child child = childList.get(i);
            ChildResponseDto.detail childDto = ChildResponseDto.detail.builder()
                    .childId(child.getId())
                    .childEmail(child.getEmail())
                    .childName(child.getName())
                    .childPhoneNumber(child.getPhoneNumber())
                    .childBirth(child.getBirth())
                    .childProfileImagePath(child.getProfileImgPath())
                    .childEnterDate(child.getEnterDate())
                    .childChildCenterId(child.getChildCenter().getId())
                    .childSpecialContent(child.getSpecialContent())
                    .build();

            childDtoList.add(childDto);
        }

        return childDtoList;
    }

    @Override
    public List<VolunteerResponseDto.detail> volunteerListByChildId(ChildRequestDto.detailById childDto) {
        Child child = childRepository.findById(childDto.getChildId())
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.volunteerListByChildId] 해당 아동 ID에 일치하는 아동이 존재하지 않습니다."));

        List<ChildVolunteerRelation> relationList = childVolunteerRelationRepository.findByChild(child);
        List<VolunteerResponseDto.detail> relationDtoList = new ArrayList<>();

        for(ChildVolunteerRelation relation: relationList){
            VolunteerResponseDto.detail volunteerDto = VolunteerResponseDto.detail.builder()
                    .volunteerId(relation.getVolunteer().getId())
                    .volunteerEmail(relation.getVolunteer().getEmail())
                    .volunteerName(relation.getVolunteer().getName())
                    .volunteerPhoneNumber(relation.getVolunteer().getPhoneNumber())
                    .volunteerBirth(relation.getVolunteer().getBirth())
                    .volunteerProfileImagePath(relation.getVolunteer().getProfileImgPath())
                    .volunteerEnterDate(relation.getVolunteer().getEnterDate())
                    .build();

            relationDtoList.add(volunteerDto);
        }

        return relationDtoList;
    }

    @Override
    public List<ChildResponseDto.detail> childList() {
        List<Child> childList = childRepository.findAll();
        List<ChildResponseDto.detail> childDtoList = new ArrayList<>();

        for (int i = 0, childListSize = childList.size(); i < childListSize; i++) {
            Child child = childList.get(i);
            ChildResponseDto.detail childDto = ChildResponseDto.detail.builder()
                    .childId(child.getId())
                    .childEmail(child.getEmail())
                    .childName(child.getName())
                    .childPhoneNumber(child.getPhoneNumber())
                    .childBirth(child.getBirth())
                    .childProfileImagePath(child.getProfileImgPath())
                    .childEnterDate(child.getEnterDate())
                    .childChildCenterId(child.getChildCenter().getId())
                    .childSpecialContent(child.getSpecialContent())
                    .build();

            childDtoList.add(childDto);
        }

        return childDtoList;
    }

    @Override
    public VolunteerResponseDto.detail volunteerDetailById(VolunteerRequestDto.detailById volunteerDto) {
        return null;
    }

    @Override
    public VolunteerResponseDto.detail volunteerDetailByEmail(VolunteerRequestDto.detailByEmail volunteerDto) {
        return null;
    }

    @Override
    public VolunteerResponseDto.detail volunteerDetailByName(VolunteerRequestDto.detailByName volunteerDto) {
        return null;
    }

    @Override
    public List<ChildResponseDto.detail> childListByVolunteer(VolunteerRequestDto.detailById volunteerDto) {
        return null;
    }

    @Override
    public List<VolunteerResponseDto.detail> volunteerList() {
        return null;
    }

    @Override
    public ManagerResponseDto.detail managerDetailById(ManagerRequestDto.detailById managerDto) {
        return null;
    }

    @Override
    public ManagerResponseDto.detail managerDetailByEmail(ManagerRequestDto.detailByEmail managerDto) {
        return null;
    }

    @Override
    public ManagerResponseDto.detail managerDetailByName(ManagerRequestDto.detailByName managerDto) {
        return null;
    }

    @Override
    public List<ManagerResponseDto.detail> managerList() {
        return null;
    }

    @Override
    public void modifyMemberPassword(MemberRequestDto.modifyPassword memberDto) {

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
