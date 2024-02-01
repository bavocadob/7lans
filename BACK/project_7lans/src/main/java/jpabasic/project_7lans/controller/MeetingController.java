package jpabasic.project_7lans.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.dto.meetingSchedule.MeetingScheduleRequestDto;
import jpabasic.project_7lans.dto.meetingSchedule.MeetingScheduleResponseDto;
import jpabasic.project_7lans.entity.MeetingSchedule;
import jpabasic.project_7lans.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/meetingSchedue")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    //해당 달 미팅 조회하기
    @Operation(summary = "해당하는 달의 화상미팅 일정 조회")
    @PostMapping("")
    public ResponseEntity<?> monthList(@RequestBody @Valid MeetingScheduleRequestDto.meetings meetingsDto){
        try{
            List<MeetingScheduleResponseDto.monthList> meetingSchedule = meetingService.findMeetingsByRelation(meetingsDto);

            return new ResponseEntity<List<MeetingScheduleResponseDto.monthList>>(meetingSchedule, HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStmoatus.INTERNAL_SERVER_ERROR);
        }
    }

    //해당 날짜 사진들 보기
    @Operation(summary = "해낭 날짜 사진들 보기")
    @GetMapping("/image/{meetingId}")
    public ResponseEntity<?> imageList(@PathVariable("meetingId") Long meetingId){
        try{
            List<MeetingScheduleResponseDto.imgList> imgList = meetingService.getImgList(meetingId);

            return new ResponseEntity<List<MeetingScheduleResponseDto.imgList>>(imgList, HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //미팅 추가 하기
    @Operation(summary = "화상미팅 예약하기")
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody MeetingScheduleRequestDto.create newMeeting){
        try{
            meetingService.create(newMeeting);

            return new ResponseEntity(HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //썸네일 수정하기
    @Operation(summary = "지난(종료된) 화상미팅의 썸네일 사진 수정하기")
    @GetMapping("/changethumbnail/{imgId}")
    public ResponseEntity changeThumbnail(@PathVariable("imgId") Long imgId){
        try{
            meetingService.changeThumbnail(imgId);

            return new ResponseEntity(HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //사진 1장 저장(캡쳐하면 1차적으로 무조건 저장)
    @Operation(summary = "캡쳐시 사진 1장 저장")
    @PostMapping("/image/saveImg")
    public ResponseEntity<Long> saveImg(@RequestBody @Valid MeetingScheduleRequestDto.saveImg img){
        try{
            return new ResponseEntity<>(meetingService.saveImg(img), HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //화상 종료 시 마음에 안드는 사진들 선택 및 삭제하기
    @Operation(summary = "화상 종료 시 마음에 안드는 사진들 선택 및 삭제하기")
    @PostMapping("/image/choice")
    public ResponseEntity choiceImg(@RequestBody @Valid List<MeetingScheduleRequestDto.choiceImg> imgs){
        try{
            meetingService.choiceImg(imgs);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //화상 시작
    @PostMapping("/open")
    public ResponseEntity openMeeting(@RequestBody @Valid MeetingScheduleRequestDto.openMeeting meetingDto){
        try{
            meetingService.openMeeting(meetingDto);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //화상 종료
    @PostMapping("/close")
    public ResponseEntity closeMeeting(@RequestBody @Valid MeetingScheduleRequestDto.closeMeeting meetingDto){
        try{
            meetingService.closeMeeting(meetingDto);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
