package jpabasic.project_7lans.service;


import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Volunteer;
import jpabasic.project_7lans.entity.VolunteerRelation;
import jpabasic.project_7lans.repository.RelationRepository;
import jpabasic.project_7lans.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VolunteerServiceImpl implements VolunteerService{

    private final VolunteerRepository volunteerRepository;
    private final RelationRepository relationRepository;

    //해당 봉사자의 아이 리스트
    @Override
    public List<ChildResponseDto.list> childList(Long volunteerId) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("[VolunteerServiceImpl.childList] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));

        //List<Relation> relations = relationRepository.findByVolunteer(volunteer);
        List<VolunteerRelation> relations = volunteer.getVolunteerRelations();
        List<ChildResponseDto.list> children = new ArrayList<>();

        for(VolunteerRelation relation : relations){
            Child child = relation.getRelation().getChild();
            children.add(ChildResponseDto.list.builder()
                    .childId(child.getId())
                    .childName(child.getName())
                    .childBirth(child.getBirth())
                    .childProfileImagePath(child.getProfileImgPath())
                    .childChildCenterId(child.getChildCenter().getId())
                    .childSpecialContent(child.getSpecialContent())
                    .build());

        }

        return children;
    }


    //봉사자 상세 정보
    @Override
    public VolunteerResponseDto.detail volunteerDetail(Long volunteerId) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("[VolunteerServiceImpl.volunteerDetail] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));
        return VolunteerResponseDto.detail.builder()
                .volunteerId(volunteer.getId())
                .volunteerEmail(volunteer.getEmail())
                .volunteerName(volunteer.getName())
                .volunteerPhoneNumber(volunteer.getPhoneNumber())
                .volunteerBirth(volunteer.getBirth())
                .volunteerProfileImagePath(volunteer.getProfileImgPath())
                .volunteerEnterDate(volunteer.getEnterDate())
                .build();
    }

    //봉사자 이름으로 검색
    @Override
    public VolunteerResponseDto.list volunteerListByName(String volunteerName) {
        List<Volunteer> volunteerList = volunteerRepository.findByNameLike(volunteerName);
        List<VolunteerResponseDto.list> volunteers = new ArrayList<>();

        for(Volunteer volunteer : volunteerList){
            volunteers.add(VolunteerResponseDto.toListDto(volunteer));
        }
        return null;
    }
}
