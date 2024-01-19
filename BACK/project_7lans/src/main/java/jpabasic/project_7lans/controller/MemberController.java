package jpabasic.project_7lans.controller;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MemberController {

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity register(){
        // 회원가입
        try{
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
