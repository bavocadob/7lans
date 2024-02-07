package jpabasic.project_7lans.childCenter.service;

import jpabasic.project_7lans.childCenter.dto.ChildCenterRequestDto;
import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.childCenter.dto.ChildCenterResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.childCenter.repository.ChildCenterRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
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

    // 관리자 센터에 소속된 아이들 리스트
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
        List<ChildCenter> childCenters = childCenterRepository.findAll();

        List<ChildCenterResponseDto.list> centerList = new ArrayList<>();

        for(ChildCenter childCenter: childCenters){
            centerList.add(ChildCenterResponseDto.list.builder()
                    .childCenterId(childCenter.getId())
                    .childCenterName(childCenter.getName())
                    .build());
        }
        return centerList;
    }

    @Override
    @Transactional
    public void centerRegister(ChildCenterRequestDto.centerDto centerDto) {
        ChildCenter childCenter = ChildCenter.builder()
                .name(centerDto.getName())
                .address(centerDto.getAddress())
                .phoneNumber(centerDto.getPhoneNumber())
                .build();

        childCenterRepository.save(childCenter);
    }
}
