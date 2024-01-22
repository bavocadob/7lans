package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.manager.ManagerRequestDto;
import jpabasic.project_7lans.dto.manager.ManagerResponseDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.member.MemberResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface MemberService {

    // ===============================================================================
    // 회원가입

    // 아동 회원가입
    public void childRegister(ChildRequestDto.register childRegisterDto);

    // 봉사자 회원가입
    public void volunteerRegister(VolunteerRequestDto.register volunteerRegisterDto);

    // 관리자 회원가입
    public void managerRegister(ManagerRequestDto.register managerRegisterDto);

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

    // 봉사자 ID 로 봉사자 1건 조회
    public VolunteerResponseDto.detail volunteerDetailById(VolunteerRequestDto.detailById volunteerDto);

    // 봉사자 Email 로 봉사자 1건 조회
    public VolunteerResponseDto.detail volunteerDetailByEmail(VolunteerRequestDto.detailByEmail volunteerDto);

    // 봉사자 Name 으로 봉사자 1건 조회
    public  VolunteerResponseDto.detail volunteerDetailByName(VolunteerRequestDto.detailByName volunteerDto);

    // 봉사자 ID로 자신의 아동 리스트 조회
    public List<ChildResponseDto.detail> childListByVolunteer(VolunteerRequestDto.detailById volunteerDto);

    // 봉사자 전체 리스트 조회
    public List<VolunteerResponseDto.detail> volunteerList();

    // 관리자 ID로 봉사자 1건 조회
    public ManagerResponseDto.detail managerDetailById(ManagerRequestDto.detailById managerDto);

    // 관리자 Email 로 관리자 1건 조회
    public ManagerResponseDto.detail managerDetailByEmail(ManagerRequestDto.detailByEmail managerDto);

    // 관리자 Name 으로 관리자 1건 조회
    public ManagerResponseDto.detail managerDetailByName(ManagerRequestDto.detailByName managerDto);

    // 관리자 리스트 조회
    public List<ManagerResponseDto.detail> managerList();

    // ===============================================================================
    // 수정

    // 멤버 개인 정보(비밀번호) 수정
    public void modifyMemberPassword(MemberRequestDto.modifyPassword memberDto);

    // ===============================================================================
    // 탈퇴

    public void deleteMember(MemberRequestDto.delete memberDto);

}
