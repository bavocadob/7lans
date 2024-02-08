package jpabasic.project_7lans.member.service;

import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.childCenter.repository.ChildCenterRepository;
import jpabasic.project_7lans.childCenter.service.ChildCenterService;
import jpabasic.project_7lans.member.dto.child.ChildRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.repository.VolunteerRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.member.repository.ChildRepository;
import jpabasic.project_7lans.member.repository.MemberRepository;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildServiceImpl implements ChildService {

    private final ChildCenterRepository childCenterRepository;
    private final RelationRepository relationRepository;
    private final VolunteerRepository volunteerRepository;
    private final ChildRepository childRepository;

    public List<VolunteerResponseDto.list> volunteerList(Long childId) {
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.volunteerList] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));

        List<Relation> relationsList = relationRepository.findByChild(child);

        List<VolunteerResponseDto.list> volunteers = new ArrayList<>();
        for (Relation relation : relationsList) {
            Volunteer volunteer = relation.getVolunteer();
            volunteers.add(VolunteerResponseDto.toListDto(volunteer, relation));
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
                .childCenterName(child.getChildCenter().getName())
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

    @Override
    public List<ChildResponseDto.childListByVolunteerAndCenter> childListByVolunteerAndCenter(ChildRequestDto.childListByVolunteerAndCenter childReqDto) {
        // 해당 센터의 아동 리스트 가져오기.
        ChildCenter childCenter = childCenterRepository.findById(childReqDto.getChildCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.childListByVolunteerAndCenter] 해당 Id와 일치하는 center가 존재하지 않습니다."));

        List<Child> children = childCenter.getChildList();

        // 봉사자 정보 가져오기
        Volunteer volunteer = volunteerRepository.findById(childReqDto.getVolunteerId())
                .orElseThrow(()-> new IllegalArgumentException("[ChildServiceImpl.childListByVolunteerAndCenter] 해당 Id와 일치하는 volunteer가 존재하지 않습니다."));

        // 봉사자의 관계 정보 가져오기.
        List<Relation> relations = relationRepository.findByVolunteer(volunteer);

        // 해시맵에 보관
        Map<Long, Child> map = new HashMap<>();
        for(Relation relation: relations){
            map.put(relation.getChild().getId(), relation.getChild());
        }

        // 반환할 ResponseDto 리스트 생성
        List<ChildResponseDto.childListByVolunteerAndCenter> childrenResponse = new ArrayList<>();

        // 해시맵을 체크하며 관계 없는 아동 정보를 ResponseDto에 담는다.
        for(Child child : children){
            if(map.containsKey(child.getId())) continue; // 해시맵에 존재하면 관계가 있는 아동이므로 continue
            childrenResponse.add(ChildResponseDto.toChildListByVolunteerAndCenterDto(child));
        }

        return childrenResponse;

    }

}
