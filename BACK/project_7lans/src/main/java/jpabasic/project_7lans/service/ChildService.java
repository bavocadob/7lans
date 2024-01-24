package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface ChildService {
    // ===============================================================================
    // 조회

    // 아동 ID 로 1건 조희
    public ChildResponseDto.detail childDetailById(ChildRequestDto.detailById childDto);

    // 아동 Email 로 1건 조회
    public ChildResponseDto.detail childDetailByEmail(ChildRequestDto.detailByEmail childDto);

    // 아동 Name 으로 1건 조회
    public ChildResponseDto.detail childDetailByName(ChildRequestDto.detailByName childDto);

    // 센터 ID로 아동 리스트 조회
    public List<ChildResponseDto.detail> childListByCenterId(ChildRequestDto.childListByChildCenter childCenterDto);

    // 아동 ID로 자신의 봉사자 리스트 조회
    public List<VolunteerResponseDto.detail> volunteerListByChildId(ChildRequestDto.detailById childDto);

    // 아동 전체 리스트 조회
    public List<ChildResponseDto.detail> childList();
}
