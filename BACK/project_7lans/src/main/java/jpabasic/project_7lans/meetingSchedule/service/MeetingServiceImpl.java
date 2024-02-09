package jpabasic.project_7lans.meetingSchedule.service;

import jpabasic.project_7lans.activityLog.entity.ActivityLog;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleRequestDto;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleResponseDto;
import jpabasic.project_7lans.activityLog.repository.ActivityLogRepository;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;
import jpabasic.project_7lans.meetingSchedule.repository.MeetingScheduleRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private final MeetingScheduleRepository meetingRepository;
    private final RelationRepository relationRepository;

    /*
    위에서부터 아래로 내려가는 방향 순서대로
    생성, 조회, 수정, 삭제의 코드가 있다.
    가장 아래는 현재 사용되지 않으면서 주석처리된 코드들이 있다.
     */

    // =================================================================================================================
    // =================================================================================================================
    // 생성

    // 화상 미팅 생성
    @Override
    @Transactional
    public void create(MeetingScheduleRequestDto.create meeting) {

        // 관계 조회
        Relation relation = relationRepository.findById(meeting.getRelationId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.create] 해당 Id와 일치하는 relation이 존재하지 않습니다."));

        // 활동 일지 생성
        ActivityLog activityLog = new ActivityLog();

        // 미팅 스케줄을 생성한다.
        MeetingSchedule newMeeting = MeetingSchedule.builder()
                .startTime(meeting.getScheduledStartTime())
                .endTime(meeting.getScheduledEndTime())
                .activityLog(activityLog)
                .build();

        // 해당 미팅 스케줄의 활동일지로 설정.
        activityLog.changeMeetingSchedule(newMeeting);

        // 관계에 미팅 스케줄 추가.
        relation.addMeetingSchedule(newMeeting);

        // DB에 저장
        meetingRepository.save(newMeeting);
    }


    // =================================================================================================================
    // =================================================================================================================
    // 조회

    // 해당 관계의 해당 년도, 해당 년월 화상 미팅 정보들 조회
    @Override
    public List<MeetingScheduleResponseDto.monthList> findMeetingsByRelation(MeetingScheduleRequestDto.meetings meetingsDto){
        //관계 찾기
        Relation relation = relationRepository.findById(meetingsDto.getRelationId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.findMeetingsByRelation] 해당 Id와 일치하는 relation이 존재하지 않습니다."));

        //관계된 모든 일정 받기 -> 월을 먼저 걸러서 받는 방법?
        List<MeetingSchedule> totalMeeting = relation.getMeetingScheduleList();

        //response
        List<MeetingScheduleResponseDto.monthList> monthMeeting = new ArrayList<>();

        for(MeetingSchedule meeting : totalMeeting){
            if(meeting.getScheduledStartTime() != null &&
                    meeting.getScheduledEndTime() != null &&
                    meeting.getScheduledStartTime().getMonthValue() == meetingsDto.getMonth() &&
                    meeting.getScheduledStartTime().getYear() == meetingsDto.getYear()){
                monthMeeting.add(MeetingScheduleResponseDto.toMonthListDto(meeting));
            }
        }
        return monthMeeting;
    }

    //미팅 상태 확인(SCHEDULED)
    public boolean isScheduled(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.SCHEDULED);
    }

    //미팅 상태 확인(OPENED)
    public boolean isOpened(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.OPENED);
    }

    //미팅 상태 확인(CLOSED)
    public boolean isClosed(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.CLOSED);
    }

    // =================================================================================================================
    // =================================================================================================================
    // 수정

    // 화상 미팅 상태 OPEN 으로 설정
    @Override
    @Transactional
    public void openMeeting(MeetingScheduleRequestDto.openMeeting meetingDto) {
        MeetingSchedule meeting = meetingRepository.findById(meetingDto.getMeetingId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.openMeeting] 해당 Id와 일치하는 meetingId가 존재하지 않습니다."));

        //미팅이 열림
        meeting.statusChangeToOpen();
    }

    // 화상 미팅 상태 CLOSED 으로 설정
    @Override
    @Transactional
    public void closeMeeting(MeetingScheduleRequestDto.closeMeeting meetingDto) {
        MeetingSchedule meeting = meetingRepository.findById(meetingDto.getMeetingId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.openMeeting] 해당 Id와 일치하는 meetingId가 존재하지 않습니다."));

        //미팅이 닫힘
        meeting.statusChangeToClosed();
    }

    // =================================================================================================================
    // =================================================================================================================
    // 삭제


    // =================================================================================================================
    // =================================================================================================================
    // 일단 주석 처리된 코드들

//    @Override
//    @Transactional
//    public Long saveImg(MeetingScheduleRequestDto.saveImg img) {
//        String uploadPath = "https://i10e103.p.ssafy.io/images/";
//
//        File folder = new File(uploadPath);
//
//        if(!folder.exists()){
//            try{
//                folder.mkdir();
//            }
//            catch(Exception e){
//                e.printStackTrace();
//            }
//        }
//
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
//        String curDate = sdf.format(new Date());
//        String ftype = img.getFile().getContentType();
//
//        String newFileName = curDate + Long.toString(System.nanoTime());
//        if(ftype.equals("image/jpeg") || ftype.equals("image/jpg")){
//            newFileName += ".jpg";
//        }
//        else {
//            newFileName += ".png";
//        }
//
//        Path copyOfLocation = Paths.get(uploadPath + File.separator + newFileName);
//
//        MeetingSchedule meeting = meetingRepository.findById(img.getMeetingId())
//                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.saveImg] 해당 Id와 일치하는 meetingId가 존재하지 않습니다."));
//
//        try{
//            Files.copy(img.getFile().getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
//
//            MeetingImage image = MeetingImage.builder()
//                    .imgPath(copyOfLocation.toString())
//                    .serverFileName(newFileName)
//                    .originFileName(img.getFile().getOriginalFilename())
//                    .contentType(ftype)
//                    .fileSize(img.getFile().getSize())
//                    .build();
//            meeting.addMeetingImage(image);
//            return meetingImageRepository.save(image).getId();
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            return null;
//        }
//
//    }

//    @Override
//    @Transactional
//    public void choiceImg(List<MeetingScheduleRequestDto.choiceImg> imgs) {
//           for(MeetingScheduleRequestDto.choiceImg imgDto : imgs){
//                meetingImageRepository.deleteById(imgDto.getImgId());
//           }
//    }
}
