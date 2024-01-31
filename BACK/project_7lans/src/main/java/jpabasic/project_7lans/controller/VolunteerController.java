package jpabasic.project_7lans.controller;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.service.RelationService;
import jpabasic.project_7lans.service.MemberService;
import jpabasic.project_7lans.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/vol")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;

    //봉사자의 아동 리스트 반환
    @GetMapping("/list/{volunteerId}")
    public ResponseEntity<List<ChildResponseDto.list>> childList(@PathVariable("volunteerId") Long volunteerId){
        try{

            List<ChildResponseDto.list> children = volunteerService.childList(volunteerId);

            return new ResponseEntity<List<ChildResponseDto.list>>(children, HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //봉사자 상세보기
    @GetMapping("/{volunteerId}")
    public ResponseEntity<?> volunteerDetail(@PathVariable("volunteerId") Long volunteerId){
        try{
            VolunteerResponseDto.detail volunteer = volunteerService.volunteerDetail(volunteerId);
            return new ResponseEntity<VolunteerResponseDto.detail>(volunteer, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //이름으로 전체 봉사자 검색(관리자용)
    @GetMapping("/search/{volunteerName}")
    public ResponseEntity<?> volunteersearchByName(@PathVariable("volunteerName") String volunteerName){
        try{

            List<VolunteerResponseDto.noRelationList> volunteers = volunteerService.volunteerListByName(volunteerName);
            return new ResponseEntity<List<VolunteerResponseDto.noRelationList>>(volunteers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //봉사 시간 출력
    @GetMapping("/time/{volunteerId}")
    public ResponseEntity<?> volunteerTime(@PathVariable("volunteerId") Long volunteerId){
        try{

            Integer volunteerTime = volunteerService.getVolunteerTime(volunteerId);
            VolunteerResponseDto.timeDto timeDto =
                    VolunteerResponseDto.timeDto.builder().volunteerTime(volunteerTime).build();
            return new ResponseEntity<VolunteerResponseDto.timeDto>(timeDto, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
