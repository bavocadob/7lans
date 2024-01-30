package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Volunteer;
import jpabasic.project_7lans.repository.ChildRepository;
import jpabasic.project_7lans.repository.MemberRepository;
import jpabasic.project_7lans.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildServiceImpl implements ChildService {

    private final RelationRepository relationRepository;
    private final ChildRepository childRepository;

    private final MemberRepository memberRepository;

    public List<VolunteerResponseDto.list> volunteerList(Long childId) {
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.volunteerList] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));

        List<Relation> relationsList = relationRepository.findByChild(child);

        List<VolunteerResponseDto.list> volunteers = new ArrayList<>();
        for (Relation relation : relationsList) {
            Volunteer volunteer = relation.getVolunteer();
            volunteers.add(VolunteerResponseDto.toListDto(volunteer));
        }

        return volunteers;
    }

    @Override
    public ChildResponseDto.detail childDetail(Long childId) {
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.childDetail] 해당 Id와 일치하는 child가 존재하지 않습니다."));

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
    @Transactional
    public void modifyContent(ChildRequestDto.childWithContent childWithContent) {
        Child child = childRepository.findById(childWithContent.getId())
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.modifyContent] 해당 Id와 일치하는 child가 존재하지 않습니다."));

        child.changeSpecialContent(childWithContent.getSpecialContent());
        childRepository.save(child);
    }

}
