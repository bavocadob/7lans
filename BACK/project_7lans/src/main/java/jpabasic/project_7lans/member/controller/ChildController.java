package jpabasic.project_7lans.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name="아동 API", description = "아동 관련 API입니다.")
@RestController
@RequestMapping(value = "/child")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    //나의 봉사자 리스트
    @Operation(summary = "아동이 나의 봉사자 리스트 조회")
    @GetMapping("/list/{childId}")
    public ResponseEntity<List<VolunteerResponseDto.list>> volunteerList(@PathVariable("childId") Long childId){
        try{
            List<VolunteerResponseDto.list> volunteers = childService.volunteerList(childId);
            return new ResponseEntity<List<VolunteerResponseDto.list>>(volunteers, HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //아동 상세보기
    @Operation(summary = "특정 아동 상세 조회")
    @GetMapping("/{childId}")
    public ResponseEntity<?> childDetail(@PathVariable("childId") Long childId){
        try{

            ChildResponseDto.detail child = childService.childDetail(childId);
            return new ResponseEntity<ChildResponseDto.detail>(child, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
