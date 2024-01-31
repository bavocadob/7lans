package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.childCenter.ChildCenterResponseDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.*;
import jpabasic.project_7lans.repository.ChildCenterRepository;
import jpabasic.project_7lans.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildCenterServiceImpl implements ChildCenterService{

    private final RelationRepository relationRepository;
    private final ChildCenterRepository childCenterRepository;

    //센터의 모든 봉사자들 리스트
    @Override
    public List<VolunteerResponseDto.list> volunteerList(Long centerId){
        ChildCenter childCenter = childCenterRepository.findById(centerId)
            .orElseThrow(() -> new IllegalArgumentException("[ChildCenterServiceImpl.volunteerList] 해당 Id와 일치하는 center가 존재하지 않습니다."));

        List<Relation> relationList = relationRepository.findByChildCenter(childCenter);

        List<VolunteerResponseDto.list> volunteers = new ArrayList<>();
        for(Relation relation : relationList){
            Volunteer volunteer = relation.getVolunteer();
            volunteers.add(VolunteerResponseDto.toListDto(volunteer, relation));
        }

        return volunteers;
    }


    // 센터의 아이들 리스트
    @Override
    public List<ChildResponseDto.noRelationList> childList(Long centerId) {
        ChildCenter childCenter = childCenterRepository.findById(centerId)
                .orElseThrow(() -> new IllegalArgumentException("[ChildCenterServiceImpl.childList] 해당 Id와 일치하는 center가 존재하지 않습니다."));

        List<Child> children = childCenter.getChildList();

        List<ChildResponseDto.noRelationList> childrenResponse = new ArrayList<>();
        for(Child child : children){
            childrenResponse.add(ChildResponseDto.toNoRelationListDto(child));
        }

        return childrenResponse;

    }

    @Override
    public List<ChildCenterResponseDto.list> list() {
        List<ChildCenter> childcenters = childCenterRepository.findAll();

        List<ChildCenterResponseDto.list> centerList = new ArrayList<>();

        for(ChildCenter childCenter: childcenters){
            centerList.add(ChildCenterResponseDto.list.builder()
                    .childCenterId(childCenter.getId())
                    .childCenterName(childCenter.getName())
                    .build());
        }
        return centerList;
    }

    @Override
    @Transactional
    public void centerRegister(MemberRequestDto.centerDto centerDto) {
        ChildCenter childCenter = ChildCenter.builder()
                .name(centerDto.getName())
                .address(centerDto.getAddress())
                .phoneNumber(centerDto.getPhoneNumber())
                .build();

        childCenterRepository.save(childCenter);
    }
}
