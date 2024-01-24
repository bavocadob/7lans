package jpabasic.project_7lans.service;


import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Volunteer;
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
    @Override
    public List<ChildResponseDto.list> childList(Long volunteerId) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("[MemberServiceImpl.deleteMember] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));

        List<Relation> relations = relationRepository.findByVolunteer(volunteer);
        List<ChildResponseDto.list> children = new ArrayList<>();

        for(Relation relation : relations){
            //children.add((Child) relation.getChild());
            //dto로 변환해서 가져와야함
            Child child = (Child) relation.getChild();
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
}
