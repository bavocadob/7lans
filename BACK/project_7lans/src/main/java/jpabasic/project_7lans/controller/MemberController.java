package jpabasic.project_7lans.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jpabasic.project_7lans.dto.childCenter.ChildCenterResponseDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.member.MemberResponseDto;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.repository.ChildCenterRepository;
import jpabasic.project_7lans.service.ChildCenterService;
import jpabasic.project_7lans.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService MemberService;

    private final ChildCenterService childCenterService;
    private final ChildCenterRepository childCenterRepository;
    // 회원가입
    @Operation(summary = "회원가입")
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid MemberRequestDto.sign memberDto){
        log.info("[MemberController.register] data input from FRONT email:{} name:{} password:{} type:{}", memberDto.getMemberEmail(),memberDto.getMemberName(),memberDto.getMemberPassword(),memberDto.getMemberType());
        // 회원가입
        try{
            if(memberDto.getMemberType().equals("V")){
                MemberService.volunteerRegister(memberDto);
            }
            else if(memberDto.getMemberType().equals("C")){

/*                ChildCenter childCenter = ChildCenter.builder().name("k").address("a").phoneNumber("0").build();

                childCenterRepository.save(childCenter);*/

                MemberService.childRegister(memberDto);
            }
            else{
                //System.out.println("m");


                MemberService.managerRegister(memberDto);
            }

            log.info("[MemberController.register] finish register member");
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid MemberRequestDto.login memberDto){
        // 로그인
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = HttpStatus.OK;
        try{
            Member find = MemberService.login(memberDto);
            MemberResponseDto.loginResponseDto user = MemberResponseDto.loginResponseDto.builder()
                    .memberId(find.getId())
                    .memberType(find.getMemberType())
                    .email(find.getEmail())
                    .password(find.getPassword())
                    .phoneNumber(find.getPhoneNumber())
                    .profileImgPath(find.getProfileImgPath())
                    .birth(find.getBirth())
                    .build();
            resultMap.put("id", find.getId());
            //return new ResponseEntity(HttpStatus.OK);
            return new ResponseEntity<MemberResponseDto.loginResponseDto>(user, status);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            //status = HttpStatus.INTERNAL_SERVER_ERROR;
        }


    }

    //센터 리스트 출력
    @Operation(summary = "회원가입시 센터 목록 출력")
    @GetMapping("/center")
    public ResponseEntity<?> centerList(){
        // 회원가입
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = HttpStatus.OK;
        try{


/*            Member find = service.login(memberDto);

            resultMap.put("id", find.getId());
            //return new ResponseEntity(HttpStatus.OK);*/
            List<ChildCenterResponseDto.list> centerList = childCenterService.list();

            return new ResponseEntity<List<ChildCenterResponseDto.list>>(centerList, HttpStatus.OK);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            //status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @Operation(summary = "센터 등록")
    @PostMapping("/center/register")
    public ResponseEntity centerRegister(@RequestBody @Valid MemberRequestDto.centerDto centerDto){

        // 회원가입
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
