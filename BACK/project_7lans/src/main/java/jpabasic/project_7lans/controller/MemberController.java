package jpabasic.project_7lans.controller;

import jakarta.validation.Valid;
import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.manager.ManagerRequestDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;
    // 회원가입
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid MemberRequestDto.sign memberDto){
        // 회원가입
        try{
            System.out.println(memberDto.getMemberType());
            if(memberDto.getMemberType().equals("V")){
                //System.out.println("v");
                VolunteerRequestDto.register registerDto = VolunteerRequestDto.register.builder()
                        .volunteerEmail(memberDto.getMemberEmail())
                        .volunteerName(memberDto.getMemberName())
                        .volunteerPassword(memberDto.getMemberPassword())
                        .volunteerPhoneNumber(memberDto.getMemberPhoneNumber())
                        .volunteerBirth(memberDto.getMemberbirth())
                        .build();
                service.volunteerRegister(registerDto);
                System.out.println(registerDto);

            }
            else if(memberDto.getMemberType().equals("C")){
                ChildRequestDto.register registerDto = ChildRequestDto.register.builder()
                        .childEmail(memberDto.getMemberEmail())
                        .childName(memberDto.getMemberName())
                        .childPassword(memberDto.getMemberPassword())
                        .childPhoneNumber(memberDto.getMemberPhoneNumber())
                        .childBirth(memberDto.getMemberbirth())
                        .childChildCenterId(10l)
                        .build();

                service.childRegister(registerDto);
            }
            else{
                //System.out.println("m");
                ManagerRequestDto.register registerDto = ManagerRequestDto.register.builder()
                        .managerEmail(memberDto.getMemberEmail())
                        .managerName(memberDto.getMemberName())
                        .managerPassword(memberDto.getMemberPassword())
                        .managerPhoneNumber(memberDto.getMemberPhoneNumber())
                        .managerBirth(memberDto.getMemberbirth())
                        .managerChildCenterId(10l)
                        .build();

                service.managerRegister(registerDto);
            }
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
