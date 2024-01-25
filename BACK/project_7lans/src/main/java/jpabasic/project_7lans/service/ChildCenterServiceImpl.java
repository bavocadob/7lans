package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.CenterRalation;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Volunteer;
import jpabasic.project_7lans.repository.ChildCenterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildCenterServiceImpl implements ChildCenterService{

    private final ChildCenterRepository childCenterRepository;

    //센터 아이들과 연동된 모든 봉사자들 리스트
    @Override
    public List<VolunteerResponseDto.list> volunteerList(Long centerId){
        ChildCenter childCenter = childCenterRepository.findById(centerId)
            .orElseThrow(() -> new IllegalArgumentException("[ChildCenterServiceImpl.volunteerList] 해당 Id와 일치하는 center가 존재하지 않습니다."));

        List<CenterRalation> relations = childCenter.getCenterRalationList();
        List<VolunteerResponseDto.list> volunteers = new ArrayList<>();

        for(CenterRalation relation : relations){
            Volunteer volunteer = relation.getRelation().getVolunteer();
            volunteers.add(VolunteerResponseDto.toListDto(volunteer));
        }
        return volunteers;
    }

}
