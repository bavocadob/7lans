package jpabasic.project_7lans.controller;


import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.member.MemberRequestDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.service.ChildCenterService;
import jpabasic.project_7lans.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ChildCenterService childCenterService;
    private final ChildService childService;
    
    //센터의 봉사자 리스트
    @Operation(summary = "해당 센터의 아동과 친구추가 되어 있는 봉사자 리스트")
    @GetMapping("/volunteers/{centerId}")
    public ResponseEntity<List<VolunteerResponseDto.list>> volunteerList(@PathVariable("centerId") Long centerId){
        try{
            List<VolunteerResponseDto.list> volunteers = childCenterService.volunteerList(centerId);
            return new ResponseEntity<List<VolunteerResponseDto.list>>(volunteers, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //센터 아동 리스트
    @Operation(summary = "해당 센터의 아동 리스트")
    @GetMapping("/child/{centerId}")
    public ResponseEntity<List<ChildResponseDto.noRelationList>> childList(@PathVariable("centerId") Long centerId){
        try{
            List<ChildResponseDto.noRelationList> children = childCenterService.childList(centerId);
            System.out.println(children.size());
            return new ResponseEntity<List<ChildResponseDto.noRelationList>>(children, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //특이사항 작성하기
    @Operation(summary = "해당 센터의 아동의 특이사항 작성하기")
    @PostMapping("/content")
    public ResponseEntity writeContent(@RequestBody ChildRequestDto.childWithContent childWithContent){
        try{

            childService.modifyContent(childWithContent);
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
