package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildRegisterReqDto;
import jpabasic.project_7lans.dto.manager.ManagerRegisterReqDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerRegisterReqDto;

public interface MemberService {

    // ===============================================================================
    // 회원가입

    // 아동 회원가입
    public void childRegister(ChildRegisterReqDto childRegisterReqDto);

    // 봉사자 회원가입
    public void volunteerRegister(VolunteerRegisterReqDto volunteerRegisterReqDto);

    // 관리자 회원가입
    public void managerRegister(ManagerRegisterReqDto managerRegisterReqDto);

    // ===============================================================================
    // 조회

    // 아동 ID로 아동 1건 조희

    // 센터 ID로 아동 리스트 조회

    // 아동 입장에서 봉사자 리스트 조회

    // 아동 전체 리스트 조회

    // 봉사자 ID로 봉사자 1건 조회

    // 봉사자 입장에서 아동 리스트 조회

    // 봉사자 리스트 조회

    // 관리자 1건 조회

    // 관리자 리스트 조회

    // ===============================================================================
    // 수정

    // 아동 개인 정보 수정
    public void childUpdate();

    // 봉사자 개인 정보 수정

    // 관리자 개인 정보 수정

    // ===============================================================================
    // 탈퇴 (메소드 1개만 있어도 가능)


}
