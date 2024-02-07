package jpabasic.project_7lans.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="봉사자 API", description = "봉사자 관련 API입니다.")
@RestController
@RequestMapping(value = "/vol")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;

    //봉사자의 아동 리스트 반환
    @Operation(summary = "봉사자의 아동 리스트 반환")
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
    @Operation(summary = "선택한 봉사자 정보 상세 보기")
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

    //봉사 시간 출력
    @Operation(summary = "봉사자의 나의 봉사 시간 출력")
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
