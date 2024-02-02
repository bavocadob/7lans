package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.manager.ManagerRequestDto;
import jpabasic.project_7lans.dto.manager.ManagerResponseDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.member.MemberResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.Member;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberService {

    // ===============================================================================
    // 회원가입

    // 아동 회원가입
    public void childRegister(MemberRequestDto.sign memberDto);

    // 봉사자 회원가입
    public void volunteerRegister(MemberRequestDto.sign memberDto);

    // 관리자 회원가입
    public void managerRegister(MemberRequestDto.sign memberDto);

    //===============================================================================
    //로그인
    public ResponseEntity<?> login(MemberRequestDto.login memberRegisterDto);

    // ===============================================================================
    // 조회


    // ===============================================================================
    // 수정


    // ===============================================================================
    // 탈퇴

    public void deleteMember(MemberRequestDto.delete memberDto);

}
