package jpabasic.project_7lans.controller;


import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.service.ChildCenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ChildCenterService childCenterService;
    
    //센터의 봉사자 리스트
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
    @GetMapping("/child/{centerId}")
    public ResponseEntity<List<ChildResponseDto.list>> childList(@PathVariable("centerId") Long centerId){
        try{
            List<ChildResponseDto.list> children = childCenterService.childList(centerId);
            return new ResponseEntity<List<ChildResponseDto.list>>(children, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
