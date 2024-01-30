package jpabasic.project_7lans.controller;

import jakarta.validation.Valid;
import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.childCenter.ChildCenterResponseDto;
import jpabasic.project_7lans.dto.manager.ManagerRequestDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.repository.ChildCenterRepository;
import jpabasic.project_7lans.service.ChildCenterService;
import jpabasic.project_7lans.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;

    private final ChildCenterService childCenterService;
    private final ChildCenterRepository childCenterRepository;
    // 회원가입
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid MemberRequestDto.sign memberDto){
        // 회원가입
        try{
            if(memberDto.getMemberType().equals("V")){
                service.volunteerRegister(memberDto);

            }
            else if(memberDto.getMemberType().equals("C")){

                ChildCenter childCenter = ChildCenter.builder().name("k").address("a").phoneNumber("0").build();

                childCenterRepository.save(childCenter);

                service.childRegister(memberDto);
            }
            else{
                //System.out.println("m");


                service.managerRegister(memberDto);
            }
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody @Valid MemberRequestDto.login memberDto){
        // 회원가입
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = HttpStatus.OK;
        try{

            Member find = service.login(memberDto);

            resultMap.put("id", find.getId());
            //return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            //return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    //센터 리스트 출력
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


}
