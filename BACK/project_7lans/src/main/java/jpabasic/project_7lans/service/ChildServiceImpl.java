package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.repository.ChildCenterRepository;
import jpabasic.project_7lans.repository.ChildRepository;
import jpabasic.project_7lans.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChildServiceImpl implements ChildService{

    private final ChildRepository childRepository;
    private final VolunteerRepository volunteerRepository;
    private final ChildCenterRepository childCenterRepository;
    // ===============================================================================
    // 조회

    // 아동 ID 로 1건 조희
    public ChildResponseDto.detail childDetailById(ChildRequestDto.detailById childDto){
        Child child = childRepository.findById(childDto.getChildId())
                .orElseThrow(()->new IllegalArgumentException("[ChildServiceImpl.childDetailById] Can't find child"));

        return ChildResponseDto.detail.toDetailDto(child);
    }

    // 아동 Email 로 1건 조회
    public ChildResponseDto.detail childDetailByEmail(ChildRequestDto.detailByEmail childDto){
        Child child = childRepository.findByEmail(childDto.getChildEmail())
                .orElseThrow(()->new IllegalArgumentException("[ChildServiceImpl.childDetailById] Can't find child"));

        return ChildResponseDto.detail.toDetailDto(child);
    }

    // 아동 Name 으로 1건 조회
    public ChildResponseDto.detail childDetailByName(ChildRequestDto.detailByName childDto){
        Child child = childRepository.findByName(childDto.getChildName())
                .orElseThrow(()->new IllegalArgumentException("[ChildServiceImpl.childDetailById] Can't find child"));

        return ChildResponseDto.detail.toDetailDto(child);
    }

    // 센터 ID로 아동 리스트 조회 -> 나중에 해당 센터에 아동 리스트 추가 관련하여 변동시 수정되어야 한다.
    public List<ChildResponseDto.detail> childListByCenterId(ChildRequestDto.childListByChildCenter childCenterDto){

        return null;
    }

    // 아동 ID로 자신의 봉사자 리스트 조회 -> 나중에 아동에게 봉사자 리스트 넣을건지
    public List<VolunteerResponseDto.detail> volunteerListByChildId(ChildRequestDto.detailById childDto){
        return null;
    }

    // 아동 전체 리스트 조회
    public List<ChildResponseDto.detail> childList(){
        List<Child> childList = childRepository.findAll();
        List<ChildResponseDto.detail> childDtoList = new ArrayList<>();

        int length = childList.size();
        for(int i=0; i<length; i++){
            childDtoList.add(ChildResponseDto.detail.toDetailDto(childList.get(i)));
        }

        return childDtoList;
    }
}
