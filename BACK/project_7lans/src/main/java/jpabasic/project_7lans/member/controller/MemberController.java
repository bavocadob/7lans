package jpabasic.project_7lans.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jpabasic.project_7lans.childCenter.dto.ChildCenterResponseDto;
import jpabasic.project_7lans.member.dto.member.MemberRequestDto;
import jpabasic.project_7lans.childCenter.service.ChildCenterService;
import jpabasic.project_7lans.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final ChildCenterService childCenterService;


    // =======================================================================================
    // 회원가입
    @Operation(summary = "회원가입")
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid MemberRequestDto.sign memberDto){
        log.info("[MemberController.register] data input from FRONT email:{} name:{} password:{} type:{}", memberDto.getMemberEmail(),memberDto.getMemberName(),memberDto.getMemberPassword(),memberDto.getMemberType());
        // 회원가입
        try{
            if(memberDto.getMemberType().equals("V")){
                memberService.volunteerRegister(memberDto);
            }
            else if(memberDto.getMemberType().equals("C")){
                memberService.childRegister(memberDto);
            }
            else{
                memberService.managerRegister(memberDto);
            }

            log.info("[MemberController.register] finish register member");
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // =======================================================================================
    // 로그인
    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid MemberRequestDto.login memberDto){
        try{
            // MemberService.login에서 멤버 유형에 따라 new ResponseEntity를 만들어 반환받는다.
            return memberService.login(memberDto);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // =======================================================================================
    //센터 리스트 출력
    @Operation(summary = "회원가입시 센터 목록 출력")
    @GetMapping("/center")
    public ResponseEntity<List<ChildCenterResponseDto.list>> centerList(){
        try{
            List<ChildCenterResponseDto.list> centerList = childCenterService.list();
            return new ResponseEntity<>(centerList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // =======================================================================================
    // 센터 등록
    @Operation(summary = "센터 등록")
    @PostMapping("/center/register")
    public ResponseEntity centerRegister(@RequestBody @Valid MemberRequestDto.centerDto centerDto){
        try{
            childCenterService.centerRegister(centerDto);
            log.info("[MemberController.centerRegister] finish register center");
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
