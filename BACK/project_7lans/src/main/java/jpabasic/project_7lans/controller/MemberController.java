package jpabasic.project_7lans.controller;

import jakarta.validation.Valid;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.service.MemberService;
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
public class MemberController {

    private MemberService service;
    // 회원가입
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid MemberRequestDto.sign memberDto){
        // 회원가입
        try{
            System.out.println(memberDto.getMemberType());
            if(memberDto.getMemberType().equals("V")){
                System.out.println("v");
            }
            else if(memberDto.getMemberType().equals("C")){
                System.out.println("c");
            }
            else{
                System.out.println("m");
            }
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
