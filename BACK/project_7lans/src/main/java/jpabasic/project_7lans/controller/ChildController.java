package jpabasic.project_7lans.controller;

import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/child")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    //나의 봉사자 리스트
    @GetMapping("/list/{childId}")
    public ResponseEntity<List<VolunteerResponseDto.list>> volunteerList(@PathVariable("childId") Long childId){
        try{

            //List<ChildResponseDto.list> children = volunteerService.childList(volunteerId);
            List<VolunteerResponseDto.list> volunteers = childService.volunteerList(childId);
            return new ResponseEntity<List<VolunteerResponseDto.list>>(volunteers, HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
